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

//
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
}
