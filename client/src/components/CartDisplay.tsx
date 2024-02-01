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

  // Function to handle removal of a cart item by its ID
  const handleRemoveClick = (id: string) => {
    removeCartItem(id);
  };

  // State to manage the fixed position of the cart on scroll
  const [isFixed, setIsFixed] = useState(false);

  //Handle cart placement on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;

      // Set a threshold for determining when to fix the cart position
      const threshold = windowHeight / 2;

      if (scrollY > threshold) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    // Add a scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the scroll event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add a CSS class for fixed positioning based on the isFixed state
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
