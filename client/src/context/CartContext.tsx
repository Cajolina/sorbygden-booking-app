import { createContext, useContext, PropsWithChildren } from "react";
import { ICartItem, ICartContext, IProduct } from "../Interfaces";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext<ICartContext>({
  cart: [],
  addToCart: () => {},
  removeCartItem: () => {},
  increaseCartQuantity: () => {},
  decreaseCartQuantity: () => {},
  totalSum: 0,
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
        }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
};

export default CartProvider;
