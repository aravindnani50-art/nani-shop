import { Link } from "react-router";

const productPriceFormatter =
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

function formatCategory(category) {
  if (!category) {
    return "General";
  }

  return category
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

function ProductCard({ product }) {
  const formattedRating =
    typeof product.rating === "number"
      ? product.rating.toFixed(1)
      : "Not rated";

  return (
    <article className="nani-shop-product-card">
      <div className="nani-shop-product-card-image-container">
        <img
          className="nani-shop-product-card-image"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />

        {product.discountPercentage > 0 && (
          <span className="nani-shop-product-card-discount">
            {Math.round(
              product.discountPercentage,
            )}
            % off
          </span>
        )}
      </div>

      <div className="nani-shop-product-card-content">
        <p className="nani-shop-product-card-category">
          {formatCategory(
            product.category,
          )}
        </p>

        <h2 className="nani-shop-product-card-title">
          {product.title}
        </h2>

        <p className="nani-shop-product-card-description">
          {product.description}
        </p>

        <div className="nani-shop-product-card-information">
          <strong className="nani-shop-product-card-price">
            {productPriceFormatter.format(
              product.price,
            )}
          </strong>

          <span className="nani-shop-product-card-rating">
            <span aria-hidden="true">
              ⭐
            </span>
            {formattedRating}
          </span>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="nani-shop-product-card-details-link"
          aria-label={`View details for ${product.title}`}
        >
          View Details
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;