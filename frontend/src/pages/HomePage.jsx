import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await client.get("/restaurants");
        setRestaurants(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) return <p>Loading restaurants...</p>;

  return (
    <>
      <h2 className="section-title">Popular restaurants near you</h2>
      <div className="grid">
        {restaurants.map((restaurant) => (
          <Link key={restaurant._id} to={`/restaurant/${restaurant._id}`} className="card">
            <img src={restaurant.image} alt={restaurant.name} />
            <div className="card-body">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.location}</p>
              <p>{restaurant.rating} stars • {restaurant.deliveryTime} mins</p>
              <div>
                {restaurant.cuisine.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;
