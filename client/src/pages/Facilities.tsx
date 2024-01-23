import { Link } from "react-router-dom";
import { useFacilityContext } from "../context/FacilityContext";
import AddToCartButton from "../components/AddToCartButton";
import CartDisplay from "../components/CartDisplay";
import BookingButton from "../components/BookingButton";
import { useCartContext } from "../context/CartContext";
import { Card, Image } from "antd";
import "../styling/Facilities.css";
import tossenImage from "../assets/images/tossen.jpg";
const { Meta } = Card;

function Facilities() {
  const { facilities } = useFacilityContext();
  const { cart } = useCartContext();

  return (
    <div>
      <div className="imageTitleContainer">
        <img
          src={tossenImage}
          alt="Tossen Lokal"
          style={{ objectFit: "cover", width: "100%", height: "50" }}
        ></img>
        <h1 className="page-title">Lokaler</h1>
      </div>

      <div className="ProductListContainer">
        {facilities.map((facility) => (
          <Card
            className="facilityCard"
            key={facility._id}
            hoverable
            style={{ width: 400, marginBottom: "20px" }}
            cover={<Image alt={facility.title} src={facility.images[0]} />}
          >
            <Meta title={facility.title} description={facility.description} />
            <p>Pris: {facility.price}</p>
            <Link to={`/lokaler/${facility._id}`}>
              <p>Läs mer här</p>
            </Link>
            <AddToCartButton product={facility} />
            <BookingButton />
          </Card>
        ))}
      </div>
      {cart.length > 0 ? <CartDisplay /> : null}
    </div>
  );
}

export default Facilities;
