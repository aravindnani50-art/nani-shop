import { Link } from "react-router";

function HomePage() {
  return (
    <section className="nani-shop-home-page">
      <div className="nani-shop-home-content">
        <p className="nani-shop-page-eyebrow">
          Product Explorer and Admin Dashboard
        </p>

        <h1 className="nani-shop-home-title">
          Discover useful products in one simple place.
        </h1>

        <p className="nani-shop-home-description">
          Browse products, search the catalogue, view product details and
          access a protected management dashboard.
        </p>

        <div className="nani-shop-home-actions">
          <Link
            to="/products"
            className="nani-shop-primary-action"
          >
            Explore Products
          </Link>

          <Link
            to="/login"
            className="nani-shop-secondary-action"
          >
            Login
          </Link>
        </div>
      </div>

      <div
        className="nani-shop-home-visual"
        aria-hidden="true"
      >
        <div className="nani-shop-visual-card nani-shop-visual-card-primary">
          <span>📱</span>
          <strong>Products</strong>
        </div>

        <div className="nani-shop-visual-card nani-shop-visual-card-secondary">
          <span>🔎</span>
          <strong>Search</strong>
        </div>

        <div className="nani-shop-visual-card nani-shop-visual-card-tertiary">
          <span>📊</span>
          <strong>Dashboard</strong>
        </div>
      </div>
    </section>
  );
}

export default HomePage;