import { useEffect } from "react";
import { useStripeCheckoutContext } from "../context/StripeCheckoutContext";

function OrderConfirmation() {
  const { verifyPayment } = useStripeCheckoutContext();

  useEffect(() => {
    console.log("OrderConfirmation mounted");
    verifyPayment();
  }, []);

  return <div>OrderConfirmation</div>;
}

export default OrderConfirmation;
