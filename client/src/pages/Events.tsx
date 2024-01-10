import { Link } from "react-router-dom";
import { useEventContext } from "../context/EventContext";

import AddToCartButton from "../components/AddToCartButton";
import CartDisplay from "../components/CartDisplay";

function Events() {
  const { events } = useEventContext();
  return (
    <div>
      {events.map((event) => (
        <div key={event._id}>
          <Link to={`/evenemang/${event._id}`} key={event._id}>
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
          </Link>
          <AddToCartButton product={event} />
        </div>
      ))}
      <CartDisplay />
    </div>
  );
}

export default Events;
