import AddToCartButton from "../components/AddToCartButton";
import CartDisplay from "../components/CartDisplay";
import SelectedDateButton from "../components/SelectDateButton";
import { useCartContext } from "../context/CartContext";
import { Card, Image } from "antd";
import "../styling/Facilities.css";
import tossenImage from "../assets/images/tossen.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFacilityContext } from "../context/FacilityContext";
const { Meta } = Card;

function Facilities() {
  // Retrieve facilities and cart from context
  const { facilities } = useFacilityContext();
  const { cart } = useCartContext();

  // State to manage selected dates
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);

  // Use a Map to track which products have a selected date
  const [isDateSelectedMap, setIsDateSelectedMap] = useState(
    new Map<string, boolean>()
  );

  // Function to handle date selection for a specific product
  const handleDateSelect = (
    startDate: string,
    endDate: string,
    productId: string
  ) => {
    // Update selected dates
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);

    // Update isDateSelectedMap for the specific product
    setIsDateSelectedMap((prevMap) => new Map(prevMap.set(productId, true)));
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
        {/* Map through facilities and display card for each */}
        {facilities.map((facility) => (
          <Card
            className="facilityCard"
            key={facility._id}
            hoverable
            style={{ width: 400, marginBottom: "20px" }}
            cover={<Image alt={facility.title} src={facility.images[0]} />}
          >
            <Meta title={facility.title} description={facility.description} />
            <p>Price: {facility.price}</p>
            {/* Link to detailed view */}
            <Link to={`/lokaler/${facility._id}`}>
              <p>Läs mer här</p>
            </Link>
            <h3>Välj datum:</h3>
            {/* Pass date selection function to SelectedDateButton */}
            <SelectedDateButton
              onDateSelect={(startDate, endDate) =>
                handleDateSelect(startDate, endDate, facility._id)
              }
            />
            {/* Display AddToCartButton only if date is selected for the current product */}
            {isDateSelectedMap.get(facility._id) && (
              <AddToCartButton
                product={{
                  ...facility,
                  startDate: selectedStartDate,
                  endDate: selectedEndDate,
                }}
              />
            )}
          </Card>
        ))}
      </div>
      {/* Display CartDisplay only if there are items in the cart */}
      {cart.length > 0 ? <CartDisplay /> : null}
    </div>
  );
}

export default Facilities;
