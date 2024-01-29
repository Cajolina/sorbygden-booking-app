import { Link } from "react-router-dom";
import { useFacilityContext } from "../context/FacilityContext";
import AddToCartButton from "../components/AddToCartButton";
import CartDisplay from "../components/CartDisplay";
import SelectDateButton from "../components/SelectDateButton";
import { useCartContext } from "../context/CartContext";
import { Card, Image } from "antd";
import "../styling/Facilities.css";
import tossenImage from "../assets/images/tossen.jpg";
import FacilityDatePicker from "../components/FacilityDatePicker";

import { useState } from "react";
const { Meta } = Card;

function Facilities() {
  const { facilities } = useFacilityContext();
  const { cart } = useCartContext();
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);

  const handleDateSelect = (startDate: string, endDate: string) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };
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
            <h3>Välj datum:</h3>
            <FacilityDatePicker onDateSelect={handleDateSelect} />
            <AddToCartButton
              product={{
                ...facility,
                startDate: selectedStartDate,
                endDate: selectedEndDate,
              }}
            />
          </Card>
        ))}
      </div>
      {cart.length > 0 ? <CartDisplay /> : null}
    </div>
  );
}

export default Facilities;
