import { useState, useEffect } from "react";
import { IEvent } from "../Interfaces";
import { useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";

function EventDetail() {
  const [event, setEvent] = useState<IEvent>();

  const { id } = useParams();

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
    <div>
      <ul>
        <li>{event._id}</li>
        <li>{event.title}</li>
        <li>{event.description}</li>
        <li>{event.price}</li>
        <ul>
          {event.images.map((image, index) => (
            <li key={index}>
              <img src={image} alt={`Image ${index + 1}`} />
            </li>
          ))}
        </ul>
        <li>{event.inStock}</li>
        <li>
          <ul>
            {event.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </li>
      </ul>
      <AddToCartButton product={event} />
    </div>
  ) : null;
}

export default EventDetail;
