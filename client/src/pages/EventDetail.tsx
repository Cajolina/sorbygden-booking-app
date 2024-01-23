import { useState, useEffect } from "react";
import { IEvent } from "../Interfaces";
import { useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import CartDisplay from "../components/CartDisplay";
import "../styling/Events.css";
import { useCartContext } from "../context/CartContext";

function EventDetail() {
  const [event, setEvent] = useState<IEvent>();

  const { id } = useParams();
  const { cart } = useCartContext();
  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`/api/events/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEvent();
  }, [id]);

  return event ? (
    <div className="detailEvent">
      <ul>
        <li>
          <h1>{event.title}</h1>
        </li>
        <li>
          <img src={event.images[0]} alt="image" />
        </li>
        <li>{event.description}</li>
        <li>{event.price}</li>

        <li>{event.inStock}</li>
        {/* <li>
          <ul>
            {event.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </li> */}
      </ul>
      <AddToCartButton product={event} />
      {cart.length > 0 ? <CartDisplay /> : null}
    </div>
  ) : null;
}

export default EventDetail;
