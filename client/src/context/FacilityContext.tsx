import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { ICreateFacility, IFacility, IFacilityContext } from "../Interfaces";

// Create a context for managing facility-related functionality
const FacilityContext = createContext<IFacilityContext>({
  facilities: [],
  fetchFacilities: () => Promise.resolve(),
  createFacility: () => Object,
  updateFacility: () => Promise.resolve(),
  deleteFacility: () => Promise.resolve(),
});

// Custom hook to access the facility context
export const useFacilityContext = () => useContext(FacilityContext);

const FacilityProvider = ({ children }: PropsWithChildren) => {
  const [facilities, setFacilities] = useState<IFacility[]>([]);

  // Function to fetch facilities from the API
  async function fetchFacilities() {
    try {
      const response = await fetch("/api/facilities");
      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch facilities when the component mounts
  useEffect(() => {
    fetchFacilities();
  }, []);

  // Function to create a new facility
  async function createFacility(event: ICreateFacility) {
    try {
      await fetch("/api/facilities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      fetchFacilities();
    } catch (error) {
      console.log(error);
    }
  }

  // Function to update an existing facility
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

  // Function to "soft-delete" a facility (mark as deleted)
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
