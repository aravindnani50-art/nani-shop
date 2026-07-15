import {
  useCallback,
  useState,
} from "react";

import ErrorState from "../components/common/ErrorState.jsx";
import ProductCard from "../components/products/ProductCard.jsx";
import ProductCardSkeleton from "../components/products/ProductCardSkeleton.jsx";

import useDebounce from "../hooks/useDebounce.js";
import useFetch from "../hooks/useFetch.js";

import {
  getProducts,
  searchProducts,
} from "../services/productService.js";

const PRODUCT_BATCH_SIZE = 12;
const INITIAL_SKELETON_COUNT = 8;
const LOAD_MORE_SKELETON_COUNT = 4;
const SEARCH_DEBOUNCE_DELAY = 500;

function mergeProductBatches(
  currentData,
  nextData,
) {
  /*
   * When skip is 0, it is a fresh request:
   * - Initial product load
   * - New search
   * - Cleared search
   *
   * Therefore, replace the previous products.
   */
  if (
    !currentData ||
    nextData.skip === 0
  ) {
    return nextData;
  }

  const currentProducts =
    currentData.products ?? [];

  const nextProducts =
    nextData.products ?? [];

  /*
   * Map prevents duplicate product IDs while
   * appending the next API batch.
   */
  const productsById = new Map(
    currentProducts.map((product) => [
      product.id,
      product,
    ]),
  );

  nextProducts.forEach((product) => {
    productsById.set(
      product.id,
      product,
    );
  });

  return {
    ...nextData,
    products: Array.from(
      productsById.values(),
    ),
  };
}

function ProductsPage() {
  const [searchInput, setSearchInput] =
    useState("");

  /*
   * Remembers which query the current pagination
   * belongs to and how many products to skip.
   */
  const [
    paginationState,
    setPaginationState,
  ] = useState({
    query: "",
    skip: 0,
  });

  const debouncedSearchInput =
    useDebounce(
      searchInput,
      SEARCH_DEBOUNCE_DELAY,
    );

  const activeSearchQuery =
    debouncedSearchInput.trim();

  /*
   * When the search query changes, the stored
   * pagination query no longer matches.
   *
   * Therefore, skip automatically becomes 0.
   * No useEffect or extra setState is required.
   */
  const skip =
    paginationState.query ===
    activeSearchQuery
      ? paginationState.skip
      : 0;

  const loadProducts = useCallback(
    ({ signal }) => {
      const requestOptions = {
        limit: PRODUCT_BATCH_SIZE,
        skip,
        signal,
      };

      if (activeSearchQuery) {
        return searchProducts(
          activeSearchQuery,
          requestOptions,
        );
      }

      return getProducts(
        requestOptions,
      );
    },
    [
      activeSearchQuery,
      skip,
    ],
  );

  const {
    data,
    loading,
    error,
    refetch,
  } = useFetch(loadProducts, {
    mergeData: mergeProductBatches,
  });

  const products =
    data?.products ?? [];

  const totalProducts = Number(
    data?.total ?? products.length,
  );

  /*
   * True while the user is still typing and
   * useDebounce has not produced the latest value.
   */
  const isDebouncing =
    searchInput.trim() !==
    activeSearchQuery;

  /*
   * skip 0 means initial loading or a fresh search.
   */
  const isFreshRequest =
    skip === 0;

  const isInitialLoading =
    loading && isFreshRequest;

  const isLoadingMore =
    loading &&
    !isFreshRequest &&
    products.length > 0;

  const hasFreshRequestError =
    !loading &&
    Boolean(error) &&
    isFreshRequest;

  const hasLoadMoreError =
    !loading &&
    Boolean(error) &&
    !isFreshRequest;

  const hasMoreProducts =
    products.length < totalProducts;

  const shouldShowProducts =
    !isInitialLoading &&
    !hasFreshRequestError &&
    products.length > 0;

  function handleSearchInputChange(
    event,
  ) {
    setSearchInput(
      event.target.value,
    );
  }

  function handleClearSearch() {
    setSearchInput("");
  }

  function handleLoadMore() {
    if (
      loading ||
      isDebouncing ||
      !hasMoreProducts
    ) {
      return;
    }

    setPaginationState({
      query: activeSearchQuery,
      skip: products.length,
    });
  }

  return (
    <section className="nani-shop-products-page">
      <div className="nani-shop-products-page-header">
        <div className="nani-shop-products-page-heading">
          <p className="nani-shop-page-eyebrow">
            Product Catalogue
          </p>

          <h1 className="nani-shop-page-title">
            Explore Products
          </h1>

          <p className="nani-shop-page-description">
            Search products and load results
            in smaller server-side batches.
          </p>
        </div>

        {!isInitialLoading &&
          !hasFreshRequestError &&
          products.length > 0 && (
            <p className="nani-shop-products-result-summary">
              Showing {products.length} of{" "}
              {totalProducts} products
            </p>
          )}
      </div>

      {/* Product search */}

      <div className="nani-shop-product-search-section">
        <label
          className="nani-shop-product-search-label"
          htmlFor="nani-shop-product-search"
        >
          Search the product catalogue
        </label>

        <div className="nani-shop-product-search-control">
          <span
            className="nani-shop-product-search-icon"
            aria-hidden="true"
          >
            🔎
          </span>

          <input
            id="nani-shop-product-search"
            className="nani-shop-product-search-input"
            type="search"
            value={searchInput}
            onChange={
              handleSearchInputChange
            }
            placeholder="Search phones, furniture, beauty products..."
            autoComplete="off"
          />

          {searchInput && (
            <button
              type="button"
              className="nani-shop-product-search-clear-button"
              onClick={handleClearSearch}
              aria-label="Clear product search"
            >
              Clear
            </button>
          )}
        </div>

        <div
          className="nani-shop-product-search-status"
          aria-live="polite"
        >
          {isDebouncing && (
            <p className="nani-shop-product-search-status-message">
              Waiting for you to finish
              typing…
            </p>
          )}

          {!isDebouncing &&
            activeSearchQuery &&
            !loading && (
              <p className="nani-shop-product-search-status-message">
                Results for “
                {activeSearchQuery}”
              </p>
            )}
        </div>
      </div>

      {/* Initial or fresh search loading */}

      {isInitialLoading && (
        <div
          className="nani-shop-product-grid"
          aria-label={
            activeSearchQuery
              ? "Search results are loading"
              : "Products are loading"
          }
          aria-busy="true"
        >
          {Array.from({
            length:
              INITIAL_SKELETON_COUNT,
          }).map((_, index) => (
            <ProductCardSkeleton
              key={`nani-shop-initial-skeleton-${index}`}
            />
          ))}
        </div>
      )}

      {/* Initial or fresh search error */}

      {hasFreshRequestError && (
        <ErrorState
          title={
            activeSearchQuery
              ? "Search results could not be loaded"
              : "Products could not be loaded"
          }
          message={error.message}
          onRetry={refetch}
        />
      )}

      {/* Empty products/search state */}

      {!loading &&
        !error &&
        products.length === 0 && (
          <section className="nani-shop-products-empty-state">
            <span
              className="nani-shop-products-empty-state-icon"
              aria-hidden="true"
            >
              🔍
            </span>

            <h2 className="nani-shop-products-empty-state-title">
              {activeSearchQuery
                ? "No matching products"
                : "No products were found"}
            </h2>

            <p className="nani-shop-products-empty-state-message">
              {activeSearchQuery
                ? `We could not find products matching “${activeSearchQuery}”.`
                : "The product catalogue is currently empty."}
            </p>

            {activeSearchQuery && (
              <button
                type="button"
                className="nani-shop-products-empty-clear-button"
                onClick={handleClearSearch}
              >
                Clear Search
              </button>
            )}
          </section>
        )}

      {/* Products success state */}

      {shouldShowProducts && (
        <>
          <div
            className="nani-shop-product-grid"
            aria-busy={isLoadingMore}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

            {isLoadingMore &&
              Array.from({
                length:
                  LOAD_MORE_SKELETON_COUNT,
              }).map((_, index) => (
                <ProductCardSkeleton
                  key={`nani-shop-load-more-skeleton-${index}`}
                />
              ))}
          </div>

          <div className="nani-shop-products-load-more-section">
            {/* Load More failure */}

            {hasLoadMoreError && (
              <div
                className="nani-shop-products-load-more-error"
                role="alert"
              >
                <p className="nani-shop-products-load-more-error-message">
                  More products could not
                  be loaded:{" "}
                  {error.message}
                </p>

                <button
                  type="button"
                  className="nani-shop-products-load-more-retry-button"
                  onClick={refetch}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Load More button */}

            {!hasLoadMoreError &&
              !isDebouncing &&
              hasMoreProducts && (
                <button
                  type="button"
                  className="nani-shop-products-load-more-button"
                  onClick={
                    handleLoadMore
                  }
                  disabled={loading}
                >
                  {isLoadingMore
                    ? "Loading more products..."
                    : activeSearchQuery
                      ? "Load More Results"
                      : "Load More Products"}
                </button>
              )}

            {/* End message */}

            {!hasLoadMoreError &&
              !isDebouncing &&
              !hasMoreProducts && (
                <p className="nani-shop-products-end-message">
                  {activeSearchQuery
                    ? "You have reached the end of these search results."
                    : "You have reached the end of the product catalogue."}
                </p>
              )}
          </div>
        </>
      )}
    </section>
  );
}

export default ProductsPage;