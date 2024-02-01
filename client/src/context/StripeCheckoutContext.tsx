import { createContext, useContext, PropsWithChildren, useState } from "react";
import {
  IEvent,
  IFacility,
  IOrderDetails,
  IOrderItemDetails,
  IStripeCheckoutContext,
  IorderItemInfo,
} from "../Interfaces";
import { useCartContext } from "./CartContext";
import { useEventContext } from "./EventContext";

// Create a context for Stripe Checkout functionality
const StripeCheckoutContext = createContext<IStripeCheckoutContext>({
  handleCheckout: () => {},
  verifyPayment: () => {},
  getOrders: () => Promise.resolve([]),
  isVerified: false,
});

// Custom hook to access the Stripe Checkout context
export const useStripeCheckoutContext = () => useContext(StripeCheckoutContext);

const StripeCheckoutProvider = ({ children }: PropsWithChildren<object>) => {
  const { cart, clearCart } = useCartContext();
  const { fetchEvents } = useEventContext();

  // State to manage the verification status of the payment
  const [isVerified, setIsVerified] = useState(false);

  // Function to handle the Stripe Checkout process
  const handleCheckout = async () => {
    try {
      if (cart.length === 0) {
        return;
      }
      // Send a request to create a checkout session
      const response = await fetch("api/create_checkout_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        return;
      }
      // Retrieve the URL and session ID from the response
      const { url, sessionId } = await response.json();
      // Store the session ID in localStorage
      localStorage.setItem("session-id", sessionId);
      // Redirect the user to the checkout URL
      window.location = url;
      // Clear the cart after successful checkout
      clearCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to verify the payment after the user returns from Stripe
  const verifyPayment = async () => {
    try {
      // Retrieve the session ID from localStorage
      const sessionId = localStorage.getItem("session-id");
      // Send a request to verify the session with the order items
      const response = await fetch("api/verify_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ sessionId, orderItems: cart }),
      });

      // Retrieve the verification status from the response
      const { verified } = await response.json();

      if (verified) {
        setIsVerified(true);
        localStorage.removeItem("session-id");
        fetchEvents();
      } else {
        setIsVerified(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to retrieve the list of orders with product information
  async function getOrders() {
    try {
      const response = await fetch("/api/orders");
      const orders = await response.json();
      // Array to store orders with product information
      const ordersWithProductInfo = [];
      // Iterate through each order
      for (const order of orders) {
        // Object to store order details and product details
        const orderDetails: IOrderDetails = {
          orderInfo: order,
          productDetails: [],
        };
        // Iterate through each order item in the order
        for (const orderItem of order.orderItems) {
          // Retrieve the product ID and product type from the order item
          const productId = orderItem.product;

          let productInfo;

          // Fetch product details based on the product type
          if (orderItem.productType === "event") {
            const eventInfoResponse = await fetch(`/api/events/${productId}`);
            productInfo = await eventInfoResponse.json();
          } else if (orderItem.productType === "facility") {
            // Fetch facility details
            const facilityInfoResponse = await fetch(
              `/api/facilities/${productId}`
            );
            productInfo = await facilityInfoResponse.json();
          }
          // Object to store order item details
          const orderItemDetails = {
            productInfo: productInfo as IEvent | IFacility,
            orderItemInfo: orderItem as IorderItemInfo,
          } as IOrderItemDetails;
          // Add the order item details to the order details
          orderDetails.productDetails.push(orderItemDetails);
        }
        // Add the order details to the array
        ordersWithProductInfo.push(orderDetails);
      }
      // Return the array of orders with product information
      return ordersWithProductInfo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return (
    <StripeCheckoutContext.Provider
      value={{ handleCheckout, verifyPayment, getOrders, isVerified }}
    >
      {children}
    </StripeCheckoutContext.Provider>
  );
};

export default StripeCheckoutProvider;
