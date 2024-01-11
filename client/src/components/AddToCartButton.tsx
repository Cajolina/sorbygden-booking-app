import { useCartContext } from "../context/CartContext";
import { IEvent, IFacility, IProduct } from "../Interfaces";

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
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();

          addToCart(product);
        }}
        disabled={disableButtonCondition}
      >
        Köp
      </button>
    </div>
  );
}

export default AddToCartButton;
