import { useCartContext } from "../context/CartContext";
import { IEvent, IFacility } from "../Interfaces";
import { Button } from "antd";
interface ExtendedIFacility extends IFacility {
  startDate?: string | null;
  endDate?: string | null;
}
type Props = {
  product: IEvent | ExtendedIFacility;
};

function AddToCartButton({ product }: Props) {
  const { addToCart, cart } = useCartContext();
  //calculate the total quantity of items in the shopping cart by summing up the quantity of each item
  // const totalQuantityInCart = cart.reduce(
  //   (total, item) => total + item.quantity,
  //   0
  // );

  // Find the cart item for the current product
  const cartItem = cart.find((item) => item.product._id === product._id);

  // Check if the product is an event or facility and update disableButtonCondition
  const disableButtonCondition =
    (product as IEvent).inStock === 0 ||
    (product as IFacility).availability === false ||
    (cartItem?.quantity || 0) >= (product as IEvent).inStock;
  const buttonText = "inStock" in product ? "Köp" : "Boka";
  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          addToCart(product);
        }}
        disabled={disableButtonCondition}
        type="primary"
      >
        {buttonText}
      </Button>
      {/* Display an error message if the event is sold out (either in the cart or out of stock) */}
      {(cartItem?.quantity || 0) >= (product as IEvent).inStock && (
        <p className="error-message">Eventet är slutsålt!</p>
      )}
      {/* Display an error message if the facility is currently unavailable */}
      {(product as IFacility).availability === false && (
        <p className="error-message">Lokalen är inte tillgänglig just nu.</p>
      )}
    </div>
  );
}

export default AddToCartButton;
