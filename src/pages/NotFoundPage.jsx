import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section className="nani-shop-not-found-page">
      <div className="nani-shop-not-found-content">
        <p className="nani-shop-not-found-code">
          404
        </p>

        <h1 className="nani-shop-not-found-title">
          This page wandered out of the shop.
        </h1>

        <p className="nani-shop-not-found-description">
          The address may be incorrect, or the requested page may have been
          moved.
        </p>

        <div className="nani-shop-not-found-actions">
          <Link
            to="/"
            className="nani-shop-primary-action"
          >
            Return Home
          </Link>

          <Link
            to="/products"
            className="nani-shop-secondary-action"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;