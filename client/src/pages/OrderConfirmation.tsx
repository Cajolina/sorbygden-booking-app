import { useEffect } from "react";
import { useStripeCheckoutContext } from "../context/StripeCheckoutContext";
import "../styling/Confirmation.css";
function OrderConfirmation() {
  // Retrieve functions and states from the StripeCheckoutContext using a custom hook
  const { verifyPayment, isVerified } = useStripeCheckoutContext();

  // useEffect hook to execute code after the component is mounted
  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div>
      <div className="confirmation-container">
        {isVerified ? (
          <p>Tack för din beställning!</p>
        ) : (
          <p>
            Betalning misslyckades! Vi kunde inte slutföra din beställning. Var
            god kontrollera dina betalningsuppgifter
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderConfirmation;
