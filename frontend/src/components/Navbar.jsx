import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { items } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/" className="brand">
          Foodie Hub
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          {isAuthenticated && <Link to="/orders">Orders</Link>}
          <Link to="/cart">Cart ({items.length})</Link>
          {isAuthenticated ? (
            <>
              <span>{user?.name}</span>
              <button type="button" className="btn btn-muted" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
