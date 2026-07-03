import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Navbar() {
  const { authStatus, user, signOut } = useAuthenticator();

  return (
    <nav className="navbar navbar-expand-lg navbar-custom py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          StyleHub
        </Link>

        <div className="navbar-nav ms-auto align-items-center">
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

          {authStatus === "authenticated" && (
            <>
              <span className="nav-link">
                Hello, {user?.signInDetails?.loginId}
              </span>

              <button
                className="btn btn-outline-dark btn-sm ms-2"
                onClick={signOut}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}