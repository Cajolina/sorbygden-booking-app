//Event interface
export interface IEvent {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  inStock: number;
  categories: string[];
  deleted?: boolean;
  type: "event";
}

export interface IEventContext {
  events: IEvent[];
  fetchEvents: () => void;
}

// Facility interface
export interface IFacility {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  availability: boolean;
  categories: string[];
  deleted?: boolean;
  type: "facility";
}

export interface IFacilityContext {
  facilities: IFacility[];
  fetchFacilities: () => void;
}

//Category interface
export interface ICategoryContextType {
  fetchCategories: () => Promise<void>;
  categories: ICategories[];
  setCategories: React.Dispatch<React.SetStateAction<ICategories[]>>;
}

export interface ICategories {
  _id: string;
  title: string;
  description: string;
}
//Interfaces for cart
export type IProduct = IEvent | IFacility;

export interface ICartItem {
  product: IProduct;
  quantity: number;
  price: number;
}

export interface ICartContext {
  cart: ICartItem[];
  addToCart: (product: IProduct) => void;
  removeCartItem: (productId: string) => void;
  increaseCartQuantity: (product: IProduct) => void;
  decreaseCartQuantity: (product: IProduct) => void;
  totalSum: number;
  clearCart: () => void;
}

//Stripe checkout interface

export interface IStripeCheckoutContext {
  handleCheckout: () => void;
  verifyPayment: () => void;
  getOrders: () => Promise<IOrderDetails[]>;
}

//login

export interface Admin {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
export interface Credentials {
  email: string;
  password: string;
}
export interface loginContext {
  loggedInAdmin: Admin | null;
  loginAdmin: (admin: Credentials) => Promise<string | void>;
  logoutAdmin: () => void;
}

//ORDER

export interface IorderItemInfo {
  product: string;
  quantity: number;
}

export interface IOrderItemDetails {
  productInfo: IEvent | IFacility;
  orderItemInfo: IorderItemInfo;
}

export interface IOrderInfo {
  created: string;
  orderItems: [];
  orderNumber: number;
  totalOrderAmount: number;
  _id: string;
}

export interface IOrderDetails {
  orderInfo: IOrderInfo;
  productDetails: IOrderItemDetails[];
}
