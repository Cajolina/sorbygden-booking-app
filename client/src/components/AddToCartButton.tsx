import { useCartContext } from "../context/CartContext";
import { IEvent, IFacility, IProduct } from "../Interfaces";
import { Button } from "antd";
type Props = {
  product: IProduct;
};

function AddToCartButton({ product }: Props) {
  const { addToCart, cart } = useCartContext();
  const totalQuantityInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const disableButtonCondition =
    totalQuantityInCart >= (product as IEvent).inStock ||
    (product as IFacility).availability == false;
  console.log(totalQuantityInCart);

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
