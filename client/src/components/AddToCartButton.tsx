import { useCartContext } from "../context/CartContext";
import { IEvent, IFacility } from "../Interfaces";
import { Button } from "antd";

type Props = {
  product: IEvent | IFacility;
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
        Köp
      </Button>
    </div>
  );
}

export default AddToCartButton;
