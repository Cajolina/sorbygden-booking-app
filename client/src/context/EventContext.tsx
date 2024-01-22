import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { IEvent, IEventContext, ICreateEvent } from "../Interfaces";

const EventContext = createContext<IEventContext>({
  events: [],
  createEvent: () => Object,
  fetchEvents: () => Promise.resolve(),
  updateEvent: () => Promise.resolve(),
  deleteEvent: () => Promise.resolve(),
});

export const useEventContext = () => useContext(EventContext);

const EventProvider = ({ children }: PropsWithChildren) => {
  const [events, setEvents] = useState<IEvent[]>([]);

  //Get all events
  async function fetchEvents() {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  //Create event
  async function createEvent(event: ICreateEvent) {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      const data = await response.json();
      console.log(data);
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  }
  //Update event
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

  //Soft delete
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
