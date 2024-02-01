import { useState, useEffect } from "react";
import { IEvent } from "../Interfaces";
import { useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import CartDisplay from "../components/CartDisplay";
import "../styling/Events.css";
import { useCartContext } from "../context/CartContext";

function EventDetail() {
  const [event, setEvent] = useState<IEvent>();

  // Accessing the 'id' parameter from the route
  const { id } = useParams();
  const { cart } = useCartContext();

  // useEffect to fetch event details when the 'id' parameter changes
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

  // Rendering the event details, add to cart button, and cart display
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
        <li>Pris: {event.price}kr</li>

        <li>I lager: {event.inStock}st </li>
      </ul>
      {/* Render the AddToCartButton component with the event as a product */}
      <AddToCartButton product={event} />
      {cart.length > 0 ? <CartDisplay /> : null}
    </div>
  ) : null;
}

export default EventDetail;
