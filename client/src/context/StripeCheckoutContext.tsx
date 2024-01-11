import { createContext, useContext, PropsWithChildren } from "react";
import { IStripeCheckoutContext } from "../Interfaces";

const StripeCheckoutContext = createContext<IStripeCheckoutContext>({
  handleCheckout: () => {},
});

export const useStripeCheckoutContext = () => useContext(StripeCheckoutContext);

const StripeCheckoutProvider = ({ children }: PropsWithChildren<object>) => {
  const handleCheckout = async () => {
    try {
      console.log("Handle Stripe checkout function");
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
