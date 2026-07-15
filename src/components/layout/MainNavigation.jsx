import {
  Link,
  NavLink,
  useNavigate,
} from "react-router";

import ThemeToggle from "../common/ThemeToggle.jsx";
import useAuth from "../../hooks/useAuth.js";

function getNavigationLinkClass({
  isActive,
}) {
  return isActive
    ? "nani-shop-navigation-link nani-shop-navigation-link-active"
    : "nani-shop-navigation-link";
}

function MainNavigation() {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const displayName =
    user?.firstName ||
    user?.username ||
    "User";

  function handleLogout() {
    logout();

    navigate("/", {
      replace: true,
    });
  }

  return (
    <header className="nani-shop-main-header">
      <div className="nani-shop-header-content">
        <Link
          to="/"
          className="nani-shop-brand-link"
          aria-label="Go to NANI Shop home page"
        >
          <span className="nani-shop-brand-primary">
            NANI
          </span>

          <span className="nani-shop-brand-secondary">
            Shop
          </span>
        </Link>

        <div className="nani-shop-header-actions">
          <nav
            className="nani-shop-main-navigation"
            aria-label="Primary navigation"
          >
            <NavLink
              to="/"
              end
              className={
                getNavigationLinkClass
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={
                getNavigationLinkClass
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/dashboard"
              className={
                getNavigationLinkClass
              }
            >
              Dashboard
            </NavLink>

            {!isAuthenticated && (
              <NavLink
                to="/login"
                className={
                  getNavigationLinkClass
                }
              >
                Login
              </NavLink>
            )}
          </nav>

          <ThemeToggle />

          {isAuthenticated && (
            <div className="nani-shop-navigation-user">
              {user?.image ? (
                <img
                  className="nani-shop-navigation-user-image"
                  src={user.image}
                  alt=""
                />
              ) : (
                <span
                  className="nani-shop-navigation-user-fallback"
                  aria-hidden="true"
                >
                  {displayName
                    .charAt(0)
                    .toUpperCase()}
                </span>
              )}

              <span className="nani-shop-navigation-user-name">
                {displayName}
              </span>

              <button
                type="button"
                className="nani-shop-navigation-logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default MainNavigation;