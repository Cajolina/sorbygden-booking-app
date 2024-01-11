import { Link } from "react-router-dom";
import { useFacilityContext } from "../context/FacilityContext";
import AddToCartButton from "../components/AddToCartButton";
import CartDisplay from "../components/CartDisplay";

function Facilities() {
  const { facilities } = useFacilityContext();
  return (
    <div>
      <h1>Lokaler</h1>
      {facilities.map((facility) => (
        <div key={facility._id}>
          <Link to={`/lokaler/${facility._id}`} key={facility._id}>
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
          </Link>
          <AddToCartButton product={facility} />
          <button>Boka nu</button>
        </div>
      ))}
      <CartDisplay />
    </div>
  );
}

export default Facilities;
