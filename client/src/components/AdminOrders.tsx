import { useEffect, useState } from "react";
import { useStripeCheckoutContext } from "../context/StripeCheckoutContext";
import { IOrderDetails } from "../Interfaces";

function AdminOrders() {
  const { getOrders } = useStripeCheckoutContext();
  const [orders, setOrders] = useState<IOrderDetails[]>([]);

  useEffect(() => {
    handleGetOrders();
  }, []);

  const handleGetOrders = async () => {
    try {
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="adminpanel-order-content">
      {orders.map((order, index) => (
        <ul key={index}>
          <li>
            <h2>Ordernummer: {order.orderInfo.orderNumber}</h2>
            <p>Order ID: {order.orderInfo._id}</p>
            <p>Skapad: {order.orderInfo.created}</p>
            <h2>Kund:</h2>
            <p>Namn: {order.orderInfo.customer.name}</p>
            <p>E-post: {order.orderInfo.customer.email}</p>
            <p>Totalsumma: {order.orderInfo.totalOrderAmount}</p>
            <ul>
              {order.productDetails.map((productItem, innerIndex) => (
                <li key={innerIndex}>
                  <h2>Produkt:</h2>
                  <p>Titeln: {productItem.productInfo.title}</p>
                  <p>Styckpris: {productItem.productInfo.price}</p>
                  <p>Typ: {productItem.productInfo.type}</p>
                  <p>Antal: {productItem.orderItemInfo.quantity}</p>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default AdminOrders;
