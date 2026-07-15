import apiClient from "./apiClient.js";

const DEFAULT_PRODUCT_BATCH_SIZE = 12;

const PRODUCT_SELECT_FIELDS = [
  "id",
  "title",
  "description",
  "category",
  "price",
  "discountPercentage",
  "rating",
  "stock",
  "brand",
  "thumbnail",
  "images",
].join(",");

function getProducts(options = {}) {
  const {
    limit = DEFAULT_PRODUCT_BATCH_SIZE,
    skip = 0,
    signal,
  } = options;

  const searchParameters =
    new URLSearchParams({
      limit: String(limit),
      skip: String(skip),
      select: PRODUCT_SELECT_FIELDS,
    });

  return apiClient(
    `/products?${searchParameters.toString()}`,
    {
      signal,
    },
  );
}

function searchProducts(
  query,
  options = {},
) {
  const {
    limit = DEFAULT_PRODUCT_BATCH_SIZE,
    skip = 0,
    signal,
  } = options;

  const searchParameters =
    new URLSearchParams({
      q: query,
      limit: String(limit),
      skip: String(skip),
      select: PRODUCT_SELECT_FIELDS,
    });

  return apiClient(
    `/products/search?${searchParameters.toString()}`,
    {
      signal,
    },
  );
}

function getProductById(
  productId,
  options = {},
) {
  const { signal } = options;

  return apiClient(
    `/products/${encodeURIComponent(productId)}`,
    {
      signal,
    },
  );
}

function addProduct(
  productData,
  options = {},
) {
  const { signal } = options;

  return apiClient("/products/add", {
    method: "POST",
    body: productData,
    signal,
  });
}

export {
  addProduct,
  getProductById,
  getProducts,
  searchProducts,
};