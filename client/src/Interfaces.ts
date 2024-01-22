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
export interface ICreateEvent extends Omit<IEvent, "_id" | "deleted"> {}
export interface IEventContext {
  events: IEvent[];
  createEvent: (event: ICreateEvent) => object;
  fetchEvents: () => void;
  deleteEvent: (data: IEvent) => void;
  updateEvent: (data: IEvent) => void;
}
// Define the data structure for events in admin event table
export interface DataTypeEvent {
  key: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  inStock: number;
  categories: string[];
  type: string;
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
export interface ICreateFacility
  extends Omit<IFacility, "_id" | "deleted" | "availability"> {}
export interface IFacilityContext {
  facilities: IFacility[];
  fetchFacilities: () => void;
  createFacility: (data: ICreateFacility) => object;
  deleteFacility: (data: IFacility) => void;
  updateFacility: (data: IFacility) => void;
}

// Define the data structure for facility in admin facility table
export interface DataTypeFacility {
  key: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  // avalability: boolean;
  categories: string[];

  type: string;
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
