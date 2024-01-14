import { Link } from "react-router-dom";
import { useFacilityContext } from "../context/FacilityContext";
import AddToCartButton from "../components/AddToCartButton";
import CartDisplay from "../components/CartDisplay";
import BookingButton from "../components/BookingButton";
import { useCartContext } from "../context/CartContext";

function Facilities() {
  const { facilities } = useFacilityContext();
  const { cart } = useCartContext();
  return (
    <div>
      <h1>Lokaler</h1>
      {facilities.map((facility) => (
        <div key={facility._id}>
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
            <li>{facility.categories}</li>
          </ul>
          <Link to={`/lokaler/${facility._id}`} key={facility._id}>
            <p>Läs mer här</p>
          </Link>
          <AddToCartButton product={facility} />
          <BookingButton />
        </div>
      ))}
      {cart.length > 0 ? <CartDisplay /> : null}
    </div>
  );
}

export default Facilities;
