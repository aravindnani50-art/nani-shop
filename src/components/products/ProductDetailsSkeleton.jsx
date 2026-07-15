function ProductDetailsSkeleton() {
  return (
    <section
      className="nani-shop-product-details-skeleton"
      aria-label="Product details are loading"
      aria-busy="true"
    >
      <div className="nani-shop-product-details-skeleton-image" />

      <div className="nani-shop-product-details-skeleton-content">
        <div className="nani-shop-skeleton-line nani-shop-product-details-skeleton-category" />

        <div className="nani-shop-skeleton-line nani-shop-product-details-skeleton-title" />

        <div className="nani-shop-skeleton-line nani-shop-product-details-skeleton-title-short" />

        <div className="nani-shop-skeleton-line nani-shop-product-details-skeleton-rating" />

        <div className="nani-shop-skeleton-line nani-shop-product-details-skeleton-description" />

        <div className="nani-shop-skeleton-line nani-shop-product-details-skeleton-description" />

        <div className="nani-shop-skeleton-line nani-shop-product-details-skeleton-description-short" />

        <div className="nani-shop-skeleton-line nani-shop-product-details-skeleton-price" />
      </div>
    </section>
  );
}

export default ProductDetailsSkeleton;