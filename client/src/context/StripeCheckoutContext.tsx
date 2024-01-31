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

const StripeCheckoutContext = createContext<IStripeCheckoutContext>({
  handleCheckout: () => {},
  verifyPayment: () => {},
  getOrders: () => Promise.resolve([]),
  isVerified: false,
});

export const useStripeCheckoutContext = () => useContext(StripeCheckoutContext);

const StripeCheckoutProvider = ({ children }: PropsWithChildren<object>) => {
  const { cart, clearCart } = useCartContext();
  const { fetchEvents } = useEventContext();
  const [isVerified, setIsVerified] = useState(false);
  const handleCheckout = async () => {
    try {
      console.log("Handle Stripe checkout function");
      if (cart.length === 0) {
        console.log("Cart it empty");
        return;
      }
      const response = await fetch("api/create_checkout_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        console.log("respons not ok", response.status);
        return;
      }

      const { url, sessionId } = await response.json();
      localStorage.setItem("session-id", sessionId);
      window.location = url;
      clearCart();
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPayment = async () => {
    try {
      const sessionId = localStorage.getItem("session-id");
      const response = await fetch("api/verify_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ sessionId, orderItems: cart }),
      });
      const { verified } = await response.json();

      if (verified) {
        console.log("is verified");
        setIsVerified(true);
        localStorage.removeItem("session-id");
        fetchEvents();
      } else {
        console.log("is NOT verified");
        setIsVerified(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getOrders() {
    try {
      const response = await fetch("/api/orders");
      const orders = await response.json();

      const ordersWithProductInfo = [];

      for (const order of orders) {
        const orderDetails: IOrderDetails = {
          orderInfo: order,
          productDetails: [],
        };

        for (const orderItem of order.orderItems) {
          const productId = orderItem.product;
          let productInfo;

          if (orderItem.productType === "event") {
            // Fetch event details
            const eventInfoResponse = await fetch(`/api/events/${productId}`);
            productInfo = await eventInfoResponse.json();
          } else if (orderItem.productType === "facility") {
            // Fetch facility details
            const facilityInfoResponse = await fetch(
              `/api/facilities/${productId}`
            );
            productInfo = await facilityInfoResponse.json();
          }

          const orderItemDetails = {
            productInfo: productInfo as IEvent | IFacility,
            orderItemInfo: orderItem as IorderItemInfo,
          } as IOrderItemDetails;

          orderDetails.productDetails.push(orderItemDetails);
        }

        ordersWithProductInfo.push(orderDetails);
      }

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
