import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          StyleHub
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/shop">
            Shop
          </Link>

          <Link className="nav-link" to="/cart">
            Cart
          </Link>

          <Link className="nav-link" to="/about">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}