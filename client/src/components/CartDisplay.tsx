import { useCartContext } from "../context/CartContext";
import TrashCanIcon from "../assets/svgs/TrashCanIcon";
import MinusIcon from "../assets/svgs/MinusIcon";
import PlusIcon from "../assets/svgs/PlusIcon";
import { Button, Card } from "antd";
import { useStripeCheckoutContext } from "../context/StripeCheckoutContext";
import "../styling/CartDisplay.css";
import { useEffect, useState } from "react";

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
  const [isFixed, setIsFixed] = useState(false);
  //Handle cart placement on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;

      //
      const threshold = windowHeight / 2;

      if (scrollY > threshold) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const containerClassName = isFixed ? "fixed" : "";
  return (
    <Card
      className={`cartContainer ${containerClassName}`}
      id="cartContainer"
      hoverable
    >
      <h2 className="cartTitle">Kundvagn</h2>
      <div className="cartItemContainer">
        {cart.map((cartItem) => (
          <div className="cart" key={cartItem.product._id}>
            <div className="cartTextColumn">
              <img
                src={cartItem.product.images[0]}
                alt=""
                style={{ width: "80px", height: "80px" }}
              />
              <div>
                <h2>{cartItem.product.title}</h2>

                <p>{cartItem.product.price} kr/st</p>
                {cartItem.product.type === "facility" && (
                  <p>{cartItem.quantity} dagar</p>
                )}
                <p>total {cartItem.product.price * cartItem.quantity} kr</p>
              </div>
            </div>

            {cartItem.product.type === "event" && (
              <div className="eventQuantity">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    decreaseCartQuantity(cartItem.product);
                  }}
                  disabled={cartItem.quantity <= 1}
                  icon={<MinusIcon />}
                  shape="default"
                  size="small"
                />
                <p>{cartItem.quantity}</p>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    increaseCartQuantity(cartItem.product);
                  }}
                  disabled={cartItem.quantity >= cartItem.product.inStock}
                  icon={<PlusIcon />}
                  shape="default"
                  size="small"
                />
              </div>
            )}

            {cartItem.product.type === "facility" && (
              <div className="dateInCartContainer">
                <h4>Datum:</h4>
                <p>Från: {cartItem.product.startDate}</p>
                <p>Till: {cartItem.product.endDate}</p>
              </div>
            )}
            <Button
              className="trashCanButton"
              onClick={(e) => {
                e.preventDefault();
                handleRemoveClick(cartItem.product._id);
              }}
              icon={<TrashCanIcon />}
            />
          </div>
        ))}
      </div>
      <h3 className="totalSum">{`Totalsumma: ${totalSum} kr`}</h3>
      <Button className="toPaymentBtn" onClick={handleCheckout}>
        Till betalning
      </Button>
    </Card>
  );
}

export default CartDisplay;
