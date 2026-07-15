function ProductCardSkeleton() {
  return (
    <article
      className="nani-shop-product-card nani-shop-product-card-skeleton"
      aria-hidden="true"
    >
      <div className="nani-shop-skeleton-product-image" />

      <div className="nani-shop-product-card-content">
        <div className="nani-shop-skeleton-line nani-shop-skeleton-line-short" />

        <div className="nani-shop-skeleton-line nani-shop-skeleton-line-title" />

        <div className="nani-shop-skeleton-line" />
        <div className="nani-shop-skeleton-line nani-shop-skeleton-line-medium" />

        <div className="nani-shop-skeleton-product-footer">
          <div className="nani-shop-skeleton-line nani-shop-skeleton-line-price" />

          <div className="nani-shop-skeleton-line nani-shop-skeleton-line-rating" />
        </div>
      </div>
    </article>
  );
}

export default ProductCardSkeleton;