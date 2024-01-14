import { Link } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import AddToCartButton from "../components/AddToCartButton";
import CartDisplay from "../components/CartDisplay";
import "../styling/Events.css";
import { Card, Image } from "antd";
import { useCartContext } from "../context/CartContext";

const { Meta } = Card;

function Events() {
  const { events } = useEventContext();
  const { cart } = useCartContext();
  return (
    <div>
      <h1>EVENEMANG</h1>
      <div>
        <div className="ProductListContainer">
          {events.map((event) => (
            <Card
              className="eventCard"
              key={event._id}
              hoverable
              style={{ width: 400, marginBottom: "20px" }}
              cover={<Image alt={event.title} src={event.images[0]} />} // Assuming the first image is the cover
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
