import { useCallback } from "react";
import {
  Link,
  useParams,
} from "react-router";

import ErrorState from "../components/common/ErrorState.jsx";
import ProductDetailsSkeleton from "../components/products/ProductDetailsSkeleton.jsx";

import useFetch from "../hooks/useFetch.js";

import { ApiError } from "../services/apiClient.js";
import { getProductById } from "../services/productService.js";

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

function ProductDetailsPage() {
  const { productId } = useParams();

  const normalizedProductId =
    productId?.trim() ?? "";

  const numericProductId = Number(
    normalizedProductId,
  );

  const isValidProductId =
    /^\d+$/.test(normalizedProductId) &&
    numericProductId > 0;

  const loadProduct = useCallback(
    ({ signal }) => {
      if (!isValidProductId) {
        throw new ApiError(
          "The product ID must be a positive number.",
          400,
        );
      }

      return getProductById(
        normalizedProductId,
        {
          signal,
        },
      );
    },
    [
      isValidProductId,
      normalizedProductId,
    ],
  );

  const {
    data: product,
    loading,
    error,
    refetch,
  } = useFetch(loadProduct);

  const isInvalidProductId =
    error?.status === 400;

  const isMissingProduct =
    error?.status === 404;

  const isResourceError =
    isInvalidProductId ||
    isMissingProduct;

  const productPrice =
    typeof product?.price === "number"
      ? productPriceFormatter.format(
          product.price,
        )
      : "Price unavailable";

  const productRating =
    typeof product?.rating === "number"
      ? product.rating.toFixed(1)
      : "Not rated";

  const productStock =
    typeof product?.stock === "number"
      ? product.stock
      : 0;

  return (
    <section className="nani-shop-product-details-page">
      <Link
        to="/products"
        className="nani-shop-product-details-back-link"
      >
        <span aria-hidden="true">←</span>
        Back to Products
      </Link>

      {loading && (
        <ProductDetailsSkeleton />
      )}

      {!loading &&
        error &&
        isResourceError && (
          <section className="nani-shop-product-resource-error">
            <span
              className="nani-shop-product-resource-error-icon"
              aria-hidden="true"
            >
              📦
            </span>

            <p className="nani-shop-page-eyebrow">
              Product unavailable
            </p>

            <h1 className="nani-shop-product-resource-error-title">
              {isInvalidProductId
                ? "That product address is invalid."
                : "That product could not be found."}
            </h1>

            <p className="nani-shop-product-resource-error-message">
              {isInvalidProductId
                ? "Product IDs must contain a positive number."
                : "The route exists, but the requested product does not exist in the catalogue."}
            </p>

            <Link
              to="/products"
              className="nani-shop-primary-action"
            >
              Browse Available Products
            </Link>
          </section>
        )}

      {!loading &&
        error &&
        !isResourceError && (
          <ErrorState
            title="Product details could not be loaded"
            message={error.message}
            onRetry={refetch}
          />
        )}

      {!loading &&
        !error &&
        product && (
          <>
            <div className="nani-shop-product-details-breadcrumb">
              <Link
                to="/products"
                className="nani-shop-product-details-breadcrumb-link"
              >
                Products
              </Link>

              <span aria-hidden="true">/</span>

              <span className="nani-shop-product-details-breadcrumb-current">
                {product.title}
              </span>
            </div>

            <article className="nani-shop-product-details-layout">
              <div className="nani-shop-product-details-media">
                <div className="nani-shop-product-details-image-container">
                  <img
                    className="nani-shop-product-details-image"
                    src={
                      product.thumbnail ||
                      product.images?.[0]
                    }
                    alt={product.title}
                  />

                  {product.discountPercentage >
                    0 && (
                    <span className="nani-shop-product-details-discount">
                      {Math.round(
                        product.discountPercentage,
                      )}
                      % off
                    </span>
                  )}
                </div>

                {Array.isArray(product.images) &&
                  product.images.length > 1 && (
                    <div className="nani-shop-product-details-thumbnail-list">
                      {product.images
                        .slice(0, 4)
                        .map(
                          (
                            productImage,
                            index,
                          ) => (
                            <div
                              className="nani-shop-product-details-thumbnail"
                              key={`${product.id}-image-${index}`}
                            >
                              <img
                                src={
                                  productImage
                                }
                                alt=""
                                aria-hidden="true"
                              />
                            </div>
                          ),
                        )}
                    </div>
                  )}
              </div>

              <div className="nani-shop-product-details-content">
                <p className="nani-shop-product-details-category">
                  {formatCategory(
                    product.category,
                  )}
                </p>

                <h1 className="nani-shop-product-details-title">
                  {product.title}
                </h1>

                <div className="nani-shop-product-details-rating-row">
                  <span className="nani-shop-product-details-rating">
                    <span aria-hidden="true">
                      ⭐
                    </span>
                    {productRating}
                  </span>

                  <span
                    className="nani-shop-product-details-separator"
                    aria-hidden="true"
                  >
                    •
                  </span>

                  <span
                    className={
                      productStock > 0
                        ? "nani-shop-product-details-stock nani-shop-product-details-stock-available"
                        : "nani-shop-product-details-stock nani-shop-product-details-stock-unavailable"
                    }
                  >
                    {productStock > 0
                      ? `${productStock} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                <p className="nani-shop-product-details-price">
                  {productPrice}
                </p>

                <p className="nani-shop-product-details-description">
                  {product.description}
                </p>

                <dl className="nani-shop-product-details-information">
                  <div className="nani-shop-product-details-information-row">
                    <dt className="nani-shop-product-details-information-label">
                      Brand
                    </dt>

                    <dd className="nani-shop-product-details-information-value">
                      {product.brand ||
                        "Not specified"}
                    </dd>
                  </div>

                  <div className="nani-shop-product-details-information-row">
                    <dt className="nani-shop-product-details-information-label">
                      Category
                    </dt>

                    <dd className="nani-shop-product-details-information-value">
                      {formatCategory(
                        product.category,
                      )}
                    </dd>
                  </div>

                  <div className="nani-shop-product-details-information-row">
                    <dt className="nani-shop-product-details-information-label">
                      Shipping
                    </dt>

                    <dd className="nani-shop-product-details-information-value">
                      {product.shippingInformation ||
                        "Standard shipping"}
                    </dd>
                  </div>

                  <div className="nani-shop-product-details-information-row">
                    <dt className="nani-shop-product-details-information-label">
                      Warranty
                    </dt>

                    <dd className="nani-shop-product-details-information-value">
                      {product.warrantyInformation ||
                        "Contact the seller"}
                    </dd>
                  </div>

                  <div className="nani-shop-product-details-information-row">
                    <dt className="nani-shop-product-details-information-label">
                      Return policy
                    </dt>

                    <dd className="nani-shop-product-details-information-value">
                      {product.returnPolicy ||
                        "Standard return policy"}
                    </dd>
                  </div>
                </dl>

                <div className="nani-shop-product-details-actions">
                  <button
                    type="button"
                    className="nani-shop-product-details-primary-button"
                    disabled={
                      productStock <= 0
                    }
                  >
                    {productStock > 0
                      ? "Add to Demo Cart"
                      : "Currently Unavailable"}
                  </button>

                  <Link
                    to="/products"
                    className="nani-shop-product-details-secondary-action"
                  >
                    Continue Browsing
                  </Link>
                </div>

                <p className="nani-shop-product-details-demo-note">
                  This application uses demo
                  product data. Cart functionality
                  is not included in the current
                  assessment scope.
                </p>
              </div>
            </article>
          </>
        )}
    </section>
  );
}

export default ProductDetailsPage;