import { Link } from "react-router-dom";
import "../styling/Home.css";
function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/evenemang">Evenemang</Link>
        </li>
        <li>
          <Link to="/lokaler">Lokaler</Link>
        </li>
        <li>
          <Link to="/kalender">Kalender</Link>
        </li>
        <li>
          <Link to="/upplev">Upplev</Link>
        </li>
        <li>
          <Link to="/om">Om hembygdsföreningen</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
