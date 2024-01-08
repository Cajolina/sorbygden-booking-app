import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { IEvent, IEventContext } from "../Interfaces";

const EventContext = createContext<IEventContext>({
  events: [],
  fetchEvents: () => Promise.resolve(),
});

export const useEventContext = () => useContext(EventContext);

const EventProvider = ({ children }: PropsWithChildren) => {
  const [events, setEvents] = useState<IEvent[]>([]);

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

  return (
    <div>
      <EventContext.Provider value={{ events, fetchEvents }}>
        {children}
      </EventContext.Provider>
    </div>
  );
};

export default EventProvider;
