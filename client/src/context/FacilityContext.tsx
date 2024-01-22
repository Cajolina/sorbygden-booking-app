import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { ICreateFacility, IFacility, IFacilityContext } from "../Interfaces";

const FacilityContext = createContext<IFacilityContext>({
  facilities: [],
  fetchFacilities: () => Promise.resolve(),
  createFacility: () => Object,
  updateFacility: () => Promise.resolve(),
  deleteFacility: () => Promise.resolve(),
});

export const useFacilityContext = () => useContext(FacilityContext);

const FacilityProvider = ({ children }: PropsWithChildren) => {
  const [facilities, setFacilities] = useState<IFacility[]>([]);

  async function fetchFacilities() {
    try {
      const response = await fetch("/api/facilities");
      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFacilities();
  }, []);

  //Create facility
  async function createFacility(event: ICreateFacility) {
    try {
      const response = await fetch("/api/facilities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      const data = await response.json();
      console.log(data);
      fetchFacilities();
    } catch (error) {
      console.log(error);
    }
  }

  //Update facility
  async function updateFacility(data: IFacility) {
    try {
      await fetch(`/api/facilities/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      fetchFacilities();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFacility(data: IFacility) {
    data = { ...data, deleted: true };
    try {
      await fetch(`/api/facilities/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      fetchFacilities();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <FacilityContext.Provider
        value={{
          facilities,
          fetchFacilities,
          deleteFacility,
          updateFacility,
          createFacility,
        }}
      >
        {children}
      </FacilityContext.Provider>
    </div>
  );
};

export default FacilityProvider;
