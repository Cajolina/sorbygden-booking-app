import React, { useEffect, useState } from "react";
import { useStripeCheckoutContext } from "../context/StripeCheckoutContext";
import { IOrderDetails } from "../Interfaces";
import { Table, Space } from "antd";
// Interface for product details within an order
interface IOrderProductDetails {
  productInfo: {
    title: string;
    price: number;
    type: string;
  };
  orderItemInfo: {
    quantity: number;
  };
}
const AdminOrders: React.FC = () => {
  const { getOrders } = useStripeCheckoutContext();
  const [orders, setOrders] = useState<IOrderDetails[]>([]);

  // Fetch orders on component mount
  useEffect(() => {
    handleGetOrders();
  }, []);

  // Function to fetch orders using the getOrders function
  const handleGetOrders = async () => {
    try {
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error(error);
    }
  };

  // Define columns for the orders table
  const columns = [
    {
      title: "Ordernummer",
      dataIndex: ["orderInfo", "orderNumber"],
      key: "orderNumber",
    },
    {
      title: "Order ID",
      dataIndex: ["orderInfo", "_id"],
      key: "orderId",
    },
    {
      title: "Skapad",
      dataIndex: ["orderInfo", "created"],
      key: "created",
    },
    {
      title: "Kund Namn",
      dataIndex: ["orderInfo", "customer", "name"],
      key: "customerName",
    },
    {
      title: "Kund E-post",
      dataIndex: ["orderInfo", "customer", "email"],
      key: "customerEmail",
    },
    {
      title: "Produkter",
      dataIndex: "productDetails",
      key: "productDetails",
      render: (productDetails: IOrderProductDetails[]) => (
        <Space
          direction="vertical"
          style={{ maxHeight: "150px", overflowY: "auto" }}
        >
          {productDetails.map((product, index) => (
            <div key={index}>
              <p>• Titel: {product.productInfo.title}</p>
              <p>Styckpris: {product.productInfo.price}</p>
              <p>Typ: {product.productInfo.type}</p>
              <p>Antal: {product.orderItemInfo.quantity}</p>
            </div>
          ))}
        </Space>
      ),
    },
    {
      title: "Totalsumma",
      dataIndex: ["orderInfo", "totalOrderAmount"],
      key: "totalOrderAmount",
    },
  ];
  // Render the orders table
  return (
    <Table
      dataSource={orders}
      columns={columns}
      rowKey={(record) => record.orderInfo._id}
    />
  );
};

export default AdminOrders;
