import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { IEvent, IEventContext, ICreateEvent } from "../Interfaces";

// Create a context for managing event-related functionality
const EventContext = createContext<IEventContext>({
  events: [],
  createEvent: () => Object,
  fetchEvents: () => Promise.resolve(),
  updateEvent: () => Promise.resolve(),
  deleteEvent: () => Promise.resolve(),
});

// Custom hook to access the event context
export const useEventContext = () => useContext(EventContext);

const EventProvider = ({ children }: PropsWithChildren) => {
  const [events, setEvents] = useState<IEvent[]>([]);

  // Function to fetch events from the API
  async function fetchEvents() {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to create a new event
  async function createEvent(event: ICreateEvent) {
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  }

  // Function to update an existing event
  async function updateEvent(data: IEvent) {
    try {
      await fetch(`/api/events/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  }

  // Function to "soft-delete" an event (mark as deleted)
  async function deleteEvent(data: IEvent) {
    data = { ...data, deleted: true };
    try {
      await fetch(`/api/events/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <EventContext.Provider
        value={{ events, fetchEvents, updateEvent, deleteEvent, createEvent }}
      >
        {children}
      </EventContext.Provider>
    </div>
  );
};

export default EventProvider;
