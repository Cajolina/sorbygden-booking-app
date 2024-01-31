import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { ICartItem, ICartContext, IProduct } from "../Interfaces";
import { useLocalStorage } from "../hooks/useLocalStorage";
import dayjs, { Dayjs } from "dayjs";

const CartContext = createContext<ICartContext>({
  cart: [],
  addToCart: () => {},
  removeCartItem: () => {},
  increaseCartQuantity: () => {},
  decreaseCartQuantity: () => {},
  totalSum: 0,
  clearCart: () => {},
  cartVisible: false,
  setCartVisible: () => {},
});

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren<object>) => {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [cartVisible, setCartVisible] = useState(false);
  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    setCartVisible(cart.length > 0);
  }, [cart]);

  // This function generates an array of date strings within a specified date range.
  const generateDateRange = (
    startDate: string | null,
    endDate: string | null
  ): string[] => {
    // Initialize an empty array to store the generated date strings.
    const dateRange = [];
    // If startDate is not null, create a Dayjs object with the provided startDate,otherwise, create a Dayjs object for the current date.
    let currentDate: Dayjs = dayjs(startDate);
    // Iterate through the date range from startDate to endDate (inclusive).
    // The loop continues as long as the currentDate is the same or before the endDate.
    while (currentDate.isSameOrBefore(endDate, "day")) {
      // Format the current date as a string in the "YYYY-MM-DD" format and add it to the dateRange array.
      dateRange.push(currentDate.format("YYYY-MM-DD"));
      // Move to the next day by adding 1 day to the currentDate.
      currentDate = currentDate.add(1, "day");
    }

    return dateRange;
  };

  const addToCart = (product: IProduct) => {
    // Find an existing item in the cart based on the product ID.
    const existingItem = cart.find(
      (item: ICartItem) => item.product._id === product._id
    );
    // Check if the product is of type "event".
    if (product.type === "event") {
      if (existingItem) {
        // If the event already exists in the cart, increase its quantity by 1.
        existingItem.quantity++;
        setCart([...cart]);
      } else {
        // If the event is not in the cart, add it with a quantity of 1.
        setCart([...cart, { product, quantity: 1 }]);
      }
    } else if (product.type === "facility") {
      // For products of type "facility," handle the scenario differently.
      const startDate = product.startDate ?? null;
      const endDate = product.endDate ?? null;
      // Generate a date range based on the facility's start and end dates.
      const dateRange = generateDateRange(startDate, endDate);
      if (existingItem) {
        // If the facility already exists in the cart, update its quantity based on the date range.
        existingItem.quantity += dateRange.length;
        setCart([...cart]);
      } else {
        // If the facility is not in the cart, add it with a quantity based on the date range.
        setCart([...cart, { product, quantity: dateRange.length }]);
      }
    }
  };

  //Remove cartitem
  const removeCartItem = (productId: string) => {
    const updatedCartItemList = cart.filter(
      (item: ICartItem) => item.product._id !== productId
    );
    setCart(updatedCartItemList);
  };

  //
  const increaseCartQuantity = (product: IProduct) => {
    const currentItem = cart.find(
      (item: ICartItem) => item.product._id === product._id
    );
    if (currentItem) {
      currentItem.quantity++;
      setCart([...cart]);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const decreaseCartQuantity = (product: IProduct) => {
    const currentItem = cart.find(
      (item: ICartItem) => item.product._id === product._id
    );
    if (currentItem) {
      currentItem.quantity--;
      setCart([...cart]);
    } else {
      setCart([...cart, { product, quantity: -1 }]);
    }
  };

  const totalSum = cart.reduce(
    (accumulator: number, item: ICartItem) =>
      accumulator + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          removeCartItem,
          increaseCartQuantity,
          decreaseCartQuantity,
          totalSum,
          clearCart,
          cartVisible,
          setCartVisible,
        }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
};

export default CartProvider;
