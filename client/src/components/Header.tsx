import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Header() {
  return (
    <div>
      <header>
        <h1 className="hero-text">
          <Link to="/">SÖRBYGDEN</Link>
        </h1>

        <Navigation />
      </header>
    </div>
  );
}

export default Header;
