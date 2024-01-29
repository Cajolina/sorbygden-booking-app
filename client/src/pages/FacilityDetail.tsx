import { useState, useEffect } from "react";
import { IFacility } from "../Interfaces";
import { useParams } from "react-router-dom";
import BookingButton from "../components/SelectDateButton";
import { useCartContext } from "../context/CartContext";
import CartDisplay from "../components/CartDisplay";

function FacilityDetail() {
  const [facility, setFacility] = useState<IFacility>();

  const { id } = useParams();
  const { cart } = useCartContext();
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

  return facility ? (
    <div>
      <ul>
        <li>{facility._id}</li>
        <li>{facility.title}</li>
        <li>{facility.description}</li>
        <li>{facility.price}</li>
        <li>
          <ul>
            {facility.images.map((image, index) => (
              <li key={index}>
                <img src={image} alt={`Image ${index + 1}`} />
              </li>
            ))}
          </ul>
        </li>
        <li>{facility.availability}</li>
        <li>
          <ul>
            {facility.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </li>
      </ul>
      <BookingButton />
      {cart.length > 0 ? <CartDisplay /> : null}
    </div>
  ) : null;
}

export default FacilityDetail;
