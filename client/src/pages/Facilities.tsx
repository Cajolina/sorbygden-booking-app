import { useFacilityContext } from "../context/FacilityContext";

function Facilities() {
  const { facilities } = useFacilityContext();
  return (
    <div>
      {facilities.map((facility) => (
        <ul key={facility._id}>
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
      ))}
    </div>
  );
}

export default Facilities;
