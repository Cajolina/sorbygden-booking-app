import { Link } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import AddToCartButton from "../components/AddToCartButton";
import CartDisplay from "../components/CartDisplay";
import "../styling/Events.css";
import { Card, Image } from "antd";
import { useCartContext } from "../context/CartContext";
import eventImage from "../assets/images/event-image.jpg";
const { Meta } = Card;

function Events() {
  const { events } = useEventContext();
  const { cart } = useCartContext();
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

      <div>
        <div className="ProductListContainer">
          {events.map((event) => (
            <Card
              className="eventCard"
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
          ))}
        </div>
        {cart.length > 0 ? <CartDisplay /> : null}
      </div>
    </div>
  );
}

export default Events;
