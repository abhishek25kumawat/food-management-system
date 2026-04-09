import { useEffect, useState } from "react";
import client from "../api/client";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await client.get("/orders/my-orders");
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h2>My Orders</h2>
      {!orders.length ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card" style={{ marginBottom: 12 }}>
            <div className="card-body">
              <h4>{order.restaurant?.name}</h4>
              <p>Status: {order.status}</p>
              <p>Total: Rs. {order.totalAmount}</p>
              <p>Items: {order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
