import { createContext, useContext, PropsWithChildren, useState } from "react";
import { ICategories, ICategoryContextType } from "../Interfaces";

// Create a context for managing category-related functionality
const CategoryContext = createContext<ICategoryContextType>({
  fetchCategories: () => Promise.resolve(),
  categories: [],
  setCategories: () => {},
});

// Custom hook to access the category context
export const useCategoryContext = () => useContext(CategoryContext);

const CategoryProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<ICategories[]>([]);

  // Function to fetch categories from the API
  async function fetchCategories() {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <CategoryContext.Provider
        value={{ fetchCategories, categories, setCategories }}
      >
        {children}
      </CategoryContext.Provider>
    </div>
  );
};

export default CategoryProvider;
