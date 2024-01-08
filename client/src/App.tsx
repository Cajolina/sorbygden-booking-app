import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Facilities from "./pages/Facilities";
import Events from "./pages/Events";
import FacilitiesEventsDetail from "./pages/FacilitiesEventsDetail";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import OrderConfirmation from "./pages/OrderConfirmation";
import CalendarPage from "./pages/CalendarPage";
import EventProvider from "./context/EventContext";
import FacilityProvider from "./context/FacilityContext";

function App() {
  return (
    <div>
      <FacilityProvider>
        <EventProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lokaler" element={<Facilities />} />
            <Route path="/Evenemang" element={<Events />} />
            <Route path="/:id" element={<FacilitiesEventsDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/confirmation" element={<OrderConfirmation />} />
            <Route path="/kalender" element={<CalendarPage />} />
          </Routes>
        </EventProvider>
      </FacilityProvider>
    </div>
  );
}

export default App;
