import { useEventContext } from "../context/EventContext";

function Events() {
  const { events } = useEventContext();

  return (
    <div>
      {events.map((event) => (
        <ul key={event._id}>
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
      ))}
    </div>
  );
}

export default Events;
