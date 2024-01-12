import { createContext, useContext, PropsWithChildren, useEffect } from "react";
import { IStripeCheckoutContext } from "../Interfaces";
import { useCartContext } from "./CartContext";

const StripeCheckoutContext = createContext<IStripeCheckoutContext>({
  handleCheckout: () => {},
  verifyPayment: () => {},
});

export const useStripeCheckoutContext = () => useContext(StripeCheckoutContext);

const StripeCheckoutProvider = ({ children }: PropsWithChildren<object>) => {
  const { cart, clearCart } = useCartContext();
  useEffect(() => {
    verifyPayment();
  }, []);
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

        body: JSON.stringify({ sessionId }),
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

  return (
    <StripeCheckoutContext.Provider value={{ handleCheckout, verifyPayment }}>
      {children}
    </StripeCheckoutContext.Provider>
  );
};

export default StripeCheckoutProvider;
