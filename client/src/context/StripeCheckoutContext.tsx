import { createContext, useContext, PropsWithChildren } from "react";
import {
  IEvent,
  IFacility,
  IOrderDetails,
  IOrderItemDetails,
  IStripeCheckoutContext,
  IorderItemInfo,
} from "../Interfaces";
import { useCartContext } from "./CartContext";

const StripeCheckoutContext = createContext<IStripeCheckoutContext>({
  handleCheckout: () => {},
  verifyPayment: () => {},
  getOrders: () => Promise.resolve([]),
});

export const useStripeCheckoutContext = () => useContext(StripeCheckoutContext);

const StripeCheckoutProvider = ({ children }: PropsWithChildren<object>) => {
  const { cart, clearCart } = useCartContext();

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
        localStorage.removeItem("session-id");
      } else {
        console.log("is NOT verified");
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

          const productInfoResponse = await fetch(`/api/events/${productId}`);
          const productInfo = await productInfoResponse.json();

          const orderItemDetails = {
            productInfo: productInfo as IEvent | IFacility,
            orderItemInfo: orderItem as IorderItemInfo,
          } as IOrderItemDetails;

          orderDetails.productDetails.push(orderItemDetails);
        }

        ordersWithProductInfo.push(orderDetails);
      }

      console.log(ordersWithProductInfo);
      return ordersWithProductInfo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return (
    <StripeCheckoutContext.Provider
      value={{ handleCheckout, verifyPayment, getOrders }}
    >
      {children}
    </StripeCheckoutContext.Provider>
  );
};

export default StripeCheckoutProvider;
