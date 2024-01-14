import { useCartContext } from "../context/CartContext";
import TrashCanIcon from "../assets/svgs/TrashCanIcon";
import MinusIcon from "../assets/svgs/MinusIcon";
import PlusIcon from "../assets/svgs/PlusIcon";
import { Button, Card } from "antd";
import { useStripeCheckoutContext } from "../context/StripeCheckoutContext";
import "../styling/CartDisplay.css";
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
    <Card className="cartContainer" hoverable>
      <h1>Kundvagn</h1>
      {cart.map((cartItem) => (
        <div className="cart" key={cartItem.product._id}>
          <img
            src={cartItem.product.images[0]}
            alt=""
            style={{ width: "80px", height: "80px" }}
          />
          <div>
            <h2>{cartItem.product.title}</h2>
            <p>{cartItem.product.price}</p>
            <p>{cartItem.quantity} st</p>
            <p>{cartItem.product.price * cartItem.quantity}</p>
          </div>

          <Button
            onClick={(e) => {
              e.preventDefault();
              handleRemoveClick(cartItem.product._id);
            }}
            icon={<TrashCanIcon />}
          />
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

      <h3>{`Totalsumma: ${totalSum} kr`}</h3>
      <Button onClick={handleCheckout}>Till betalning</Button>
    </Card>
  );
}

export default CartDisplay;
