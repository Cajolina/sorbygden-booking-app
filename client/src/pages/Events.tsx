import { Link } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import AddToCartButton from "../components/AddToCartButton";
import CartDisplay from "../components/CartDisplay";
import "../styling/Events.css";
import "../styling/SharedProductStyles.css";
import { Card, Image } from "antd";
import { useCartContext } from "../context/CartContext";
// import eventImage from "../assets/images/event-image-5.jpg";
import eventImage from "../assets/images/event-image-kopia2.png";
const { Meta } = Card;

function Events() {
  const { events } = useEventContext();
  const { cart, cartVisible } = useCartContext();
  return (
    <div>
      <div className="imageTitleContainer">
        <img
          src={eventImage}
          alt="eventImage"
          style={{ objectFit: "cover", width: "100%", height: "50" }}
        ></img>
        <h1 className="page-title-green">Evenemang</h1>
      </div>

      <div className="productContainer">
        <div
          className={`ProductListContainer ${cartVisible ? "withCart" : ""}`}
        >
          {events.map((event) => (
            <Card
              className="productCard"
              key={event._id}
              hoverable
              style={{ width: 400, marginBottom: "20px" }}
              cover={<Image alt={event.title} src={event.images[0]} />}
            >
              <Meta title={event.title} description={event.description} />
              <p>Pris: {event.price}</p>
              <p>I lager: {event.inStock}</p>
              <Link to={`/evenemang/${event._id}`}>
                <p>Läs mer här</p>
              </Link>
              <AddToCartButton product={event} />
            </Card>
          ))}{" "}
          {cart.length > 0 ? <CartDisplay /> : null}
        </div>
      </div>
    </div>
  );
}

export default Events;
