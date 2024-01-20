import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Facilities from "./pages/Facilities";
import Events from "./pages/Events";
import FacilityDetail from "./pages/FacilityDetail";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import OrderConfirmation from "./pages/OrderConfirmation";
import CalendarPage from "./pages/CalendarPage";
import EventProvider from "./context/EventContext";
import FacilityProvider from "./context/FacilityContext";
import EventDetail from "./pages/EventDetail";
import CartProvider from "./context/CartContext";
import StripeCheckoutProvider from "./context/StripeCheckoutContext";
import LoginProvider from "./context/LoginContext";
import CategoryProvider from "./context/CategoryContext";

function App() {
  return (
    <div>
      <CategoryProvider>
        <FacilityProvider>
          <EventProvider>
            <CartProvider>
              <StripeCheckoutProvider>
                <LoginProvider>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/lokaler" element={<Facilities />} />
                    <Route path="/evenemang" element={<Events />} />
                    <Route path="/evenemang/:id" element={<EventDetail />} />
                    <Route path="/lokaler/:id" element={<FacilityDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/adminpanel" element={<AdminPanel />} />
                    <Route
                      path="/confirmation"
                      element={<OrderConfirmation />}
                    />
                    <Route path="/kalender" element={<CalendarPage />} />
                  </Routes>
                </LoginProvider>
              </StripeCheckoutProvider>
            </CartProvider>
          </EventProvider>
        </FacilityProvider>
      </CategoryProvider>
    </div>
  );
}

export default App;
