import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Premises from "./pages/Premises";
import Events from "./pages/Events";
import PremisesEventsDetail from "./pages/PremisesEventsDetail";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import OrderConfirmation from "./pages/OrderConfirmation";
import CalendarPage from "./pages/CalendarPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lokaler" element={<Premises />} />
        <Route path="/Evenemang" element={<Events />} />
        <Route path="/:id" element={<PremisesEventsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
        <Route path="/kalender" element={<CalendarPage />} />
      </Routes>
    </div>
  );
}

export default App;
