import { Link } from "react-router-dom";
import "../styling/Footer.css";
import {
  LockOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
function Footer() {
  return (
    <footer>
      <div className="footerContainer">
        <div className="footerSocialmedia">
          <h3>Social media</h3>
          <a href="https://www.instagram.com/">
            <InstagramOutlined />
            Instagram
          </a>
          <a href="https://www.facebook.com/groups/167437447122202">
            <FacebookOutlined />
            Facebook
          </a>
        </div>
        <div className="footerInfo">
          <h3>Kontakt</h3>
          <p>Adress: Sörbygden 526, </p>
          <p>843 98 Sörbygden</p>
          <p>Telefon: 0696-700 63</p>
        </div>
      </div>

      <Link to="/login" className="linkToLogin">
        <LockOutlined />
      </Link>
    </footer>
  );
}

export default Footer;
