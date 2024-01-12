import { createContext, useContext, PropsWithChildren } from "react";
import { IStripeCheckoutContext } from "../Interfaces";
import { useCartContext } from "./CartContext";

const StripeCheckoutContext = createContext<IStripeCheckoutContext>({
  handleCheckout: () => {},
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

  return (
    <StripeCheckoutContext.Provider value={{ handleCheckout }}>
      {children}
    </StripeCheckoutContext.Provider>
  );
};

export default StripeCheckoutProvider;
