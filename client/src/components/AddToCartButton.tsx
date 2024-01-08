import { useCartContext } from "../context/CartContext";
import { IProduct } from "../Interfaces";

type Props = {
  product: IProduct;
};

function AddToCartButton({ product }: Props) {
  const { addToCart } = useCartContext();

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          addToCart(product);
        }}
      >
        Köp
      </button>
    </div>
  );
}

export default AddToCartButton;
