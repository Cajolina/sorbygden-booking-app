import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { IFacility, IFacilityContext } from "../Interfaces";

const FacilityContext = createContext<IFacilityContext>({
  facilities: [],
  fetchFacilities: () => Promise.resolve(),
});

export const useFacilityContext = () => useContext(FacilityContext);

const FacilityProvider = ({ children }: PropsWithChildren) => {
  const [facilities, setFacilities] = useState<IFacility[]>([]);

  async function fetchFacilities() {
    try {
      const response = await fetch("api/facilities");
      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
    <div>
      <FacilityContext.Provider value={{ facilities, fetchFacilities }}>
        {children}
      </FacilityContext.Provider>
    </div>
  );
};
export default FacilityProvider;
