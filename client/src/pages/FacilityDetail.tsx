import { useState, useEffect } from "react";
import { IFacility } from "../Interfaces";
import { useParams } from "react-router-dom";

import { useCartContext } from "../context/CartContext";
import CartDisplay from "../components/CartDisplay";

function FacilityDetail() {
  const [facility, setFacility] = useState<IFacility>();

  // Accessing the 'id' parameter from the route
  const { id } = useParams();
  const { cart } = useCartContext();

  // useEffect to fetch facility details when the 'id' parameter changes
  useEffect(() => {
    async function fetchFacility() {
      try {
        const response = await fetch(`/api/facilities/${id}`);
        const data = await response.json();
        setFacility(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFacility();
  }, [id]);

  // Rendering the facility details and cart display
  return facility ? (
    <div className="detailFacility">
      <div>
        <h2>{facility.title}</h2>
        <p>{facility.description}</p>
        <p>{facility.price}kr</p>
        <div className="detailImages">
          {facility.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      {/* Displaying the cart if items are present in the cart */}
      {cart.length > 0 ? <CartDisplay /> : null}
    </div>
  ) : null;
}

export default FacilityDetail;
