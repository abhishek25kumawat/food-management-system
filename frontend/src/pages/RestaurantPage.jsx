import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { useCart } from "../context/CartContext";

const RestaurantPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const { data } = await client.get(`/restaurants/${id}`);
      setRestaurant(data);
    };
    fetchRestaurant();
  }, [id]);

  if (!restaurant) return <p>Loading menu...</p>;

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.location} • {restaurant.deliveryTime} mins</p>
      <h3>Menu</h3>
      {restaurant.menu.map((item) => (
        <div key={item._id} className="menu-item">
          <h4>{item.name}</h4>
          <p>{item.description}</p>
          <p>Rs. {item.price}</p>
          <button className="btn btn-primary" onClick={() => addToCart(item, restaurant._id)}>
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default RestaurantPage;
