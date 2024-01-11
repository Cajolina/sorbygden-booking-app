import { useCartContext } from "../context/CartContext";
import TrashCanIcon from "../assets/svgs/TrashCanIcon";
import MinusIcon from "../assets/svgs/MinusIcon";
import PlusIcon from "../assets/svgs/PlusIcon";
import { Button } from "antd";
import { useStripeCheckoutContext } from "../context/StripeCheckoutContext";
function CartDisplay() {
  const {
    cart,
    removeCartItem,
    decreaseCartQuantity,
    increaseCartQuantity,
    totalSum,
  } = useCartContext();
  const { handleCheckout } = useStripeCheckoutContext();
  const handleRemoveClick = (id: string) => {
    removeCartItem(id);
  };

  return (
    <div>
      {cart.map((cartItem) => (
        <div key={cartItem.product._id}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleRemoveClick(cartItem.product._id);
            }}
            icon={<TrashCanIcon />}
          />
          <img
            src={cartItem.product.images[0]}
            alt=""
            style={{ width: "50%", height: "auto" }}
          />
          <p>{cartItem.product.title}</p>
          <p>{cartItem.product.price}</p>
          <p>{cartItem.quantity} st</p>
          <p>{cartItem.product.price * cartItem.quantity}</p>
          {cartItem.product.type === "event" && (
            <>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  decreaseCartQuantity(cartItem.product);
                }}
                disabled={cartItem.quantity <= 1}
                icon={<MinusIcon />}
                shape="circle"
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  increaseCartQuantity(cartItem.product);
                }}
                disabled={cartItem.quantity >= cartItem.product.inStock}
                icon={<PlusIcon />}
                shape="circle"
              />
            </>
          )}
        </div>
      ))}

      {cart.length > 0 && <h3>{`Totalsumma: ${totalSum} kr`}</h3> && (
        <Button onClick={handleCheckout}>Till betalning</Button>
      )}
    </div>
  );
}

export default CartDisplay;
