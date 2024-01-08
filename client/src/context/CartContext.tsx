import { createContext, useContext, PropsWithChildren } from "react";
import { ICartItem, ICartContext, IProduct } from "../Interfaces";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext<ICartContext>({
  cart: [],
  addToCart: () => {},
});

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren<object>) => {
  const [cart, setCart] = useLocalStorage("cart", []);

  const addToCart = (product: IProduct) => {
    const existingItem = cart.find(
      (item: ICartItem) => item.product._id === product._id
    );
    if (existingItem) {
      existingItem.quantity++;
      setCart([...cart]);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  return (
    <div>
      <CartContext.Provider
        value={{
          cart,
          addToCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
};

export default CartProvider;
