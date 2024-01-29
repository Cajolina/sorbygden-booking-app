import { Link, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import "../styling/Header.css";
function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/"; // Check if the current page is the home page

  return (
    <div>
      <header>
        <h1 className={`hero-text ${isHomePage ? "home-header" : ""}`}>
          <Link to="/">SÖRBYGDEN</Link>
        </h1>

        <Navigation />
      </header>
    </div>
  );
}

export default Header;
