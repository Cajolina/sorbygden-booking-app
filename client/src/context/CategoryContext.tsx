import { createContext, useContext, PropsWithChildren, useState } from "react";
import { ICategories, ICategoryContextType } from "../Interfaces";

const CategoryContext = createContext<ICategoryContextType>({
  fetchCategories: () => Promise.resolve(),
  categories: [],
  setCategories: () => {},
});

export const useCategoryContext = () => useContext(CategoryContext);

const CategoryProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<ICategories[]>([]);
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
