import { Link } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import AddToCartButton from "../components/AddToCartButton";
import CartDisplay from "../components/CartDisplay";
import "../styling/Events.css";

function Events() {
  const { events } = useEventContext();
  return (
    <div>
      <h1>Evenemang</h1>
      <div className="ProductListContainer">
        <div>
          {events.map((event) => (
            <div key={event._id}>
              <ul>
                <li>{event._id}</li>
                <li>{event.title}</li>
                <li>{event.description}</li>
                <li>{event.price}</li>
                <li>
                  <ul>
                    {event.images.map((image, index) => (
                      <li key={index}>
                        <img src={image} alt={`Image ${index + 1}`} />
                      </li>
                    ))}
                  </ul>
                </li>
                <li>{event.inStock}</li>
                <li>{event.categories}</li>
              </ul>
              <Link to={`/evenemang/${event._id}`} key={event._id}>
                <p>Läs mer här</p>
              </Link>
              <AddToCartButton product={event} />
            </div>
          ))}
        </div>

        <CartDisplay />
      </div>
    </div>
  );
}

export default Events;
