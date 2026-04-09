import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, restaurantId, totalAmount, changeQuantity, clearCart } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || "");
  const [placing, setPlacing] = useState(false);
  const [message, setMessage] = useState("");

  const placeOrder = async () => {
    if (!items.length) return;
    setPlacing(true);
    setMessage("");
    try {
      await client.post("/orders", {
        restaurant: restaurantId,
        deliveryAddress,
        items: items.map((item) => ({
          menuItemId: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      });
      clearCart();
      setMessage("Order placed successfully");
      navigate("/orders");
    } catch (error) {
      setMessage(error.response?.data?.message || "Order failed");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div>
      <h2>Your cart</h2>
      {!items.length ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item._id} className="cart-row">
              <h4>{item.name}</h4>
              <p>Rs. {item.price}</p>
              <div>
                <button className="btn btn-muted" onClick={() => changeQuantity(item._id, -1)}>
                  -
                </button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button className="btn btn-muted" onClick={() => changeQuantity(item._id, 1)}>
                  +
                </button>
              </div>
            </div>
          ))}
          <h3>Total: Rs. {totalAmount}</h3>
          <textarea
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Delivery address"
            style={{ width: "100%", maxWidth: 500, minHeight: 90 }}
          />
          <div style={{ marginTop: 12 }}>
            <button className="btn btn-primary" disabled={placing} onClick={placeOrder}>
              {placing ? "Placing..." : "Place order"}
            </button>
          </div>
          {message && <p>{message}</p>}
        </>
      )}
    </div>
  );
};

export default CartPage;
