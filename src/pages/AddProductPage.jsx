import { useState } from "react";
import { Link } from "react-router";

import useAuth from "../hooks/useAuth.js";

import {
  addProduct,
} from "../services/productService.js";

import {
  PRODUCT_FORM_FIELDS,
  createProductPayload,
  validateProductForm,
} from "../utils/productValidation.js";

const INITIAL_FORM_DATA = {
  title: "",
  brand: "",
  category: "",
  price: "",
  stock: "",
  discountPercentage: "0",
  thumbnail: "",
  description: "",
};

const productPriceFormatter =
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

function createTouchedFields() {
  return Object.fromEntries(
    PRODUCT_FORM_FIELDS.map(
      (fieldName) => [
        fieldName,
        true,
      ],
    ),
  );
}

function getDisplayName(user) {
  return (
    [user?.firstName, user?.lastName]
      .filter(Boolean)
      .join(" ") ||
    user?.username ||
    "Authenticated user"
  );
}

function AddProductPage() {
  const { user } = useAuth();

  const [formData, setFormData] =
    useState(INITIAL_FORM_DATA);

  const [errors, setErrors] =
    useState({});

  const [
    touchedFields,
    setTouchedFields,
  ] = useState({});

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  const [
    createdProduct,
    setCreatedProduct,
  ] = useState(null);

  const displayName =
    getDisplayName(user);

  function updateFieldError(
    fieldName,
    nextFormData,
  ) {
    const validationErrors =
      validateProductForm(
        nextFormData,
      );

    const fieldError =
      validationErrors[fieldName];

    setErrors((currentErrors) => {
      const nextErrors = {
        ...currentErrors,
      };

      if (fieldError) {
        nextErrors[fieldName] =
          fieldError;
      } else {
        delete nextErrors[fieldName];
      }

      return nextErrors;
    });
  }

  function handleInputChange(event) {
    const { name, value } =
      event.target;

    const nextFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(nextFormData);

    if (
      touchedFields[name] ||
      errors[name]
    ) {
      updateFieldError(
        name,
        nextFormData,
      );
    }

    if (submitError) {
      setSubmitError("");
    }
  }

  function handleInputBlur(event) {
    const { name } = event.target;

    setTouchedFields(
      (currentFields) => ({
        ...currentFields,
        [name]: true,
      }),
    );

    updateFieldError(
      name,
      formData,
    );
  }

  function handleResetForm() {
    setFormData(
      INITIAL_FORM_DATA,
    );

    setErrors({});
    setTouchedFields({});
    setSubmitError("");
  }

  function handleAddAnotherProduct() {
    setCreatedProduct(null);

    setFormData(
      INITIAL_FORM_DATA,
    );

    setErrors({});
    setTouchedFields({});
    setSubmitError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors =
      validateProductForm(formData);

    if (
      Object.keys(
        validationErrors,
      ).length > 0
    ) {
      setErrors(validationErrors);

      setTouchedFields(
        createTouchedFields(),
      );

      setSubmitError(
        "Please correct the highlighted fields before submitting.",
      );

      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const productPayload =
        createProductPayload(
          formData,
        );

      const newProduct =
        await addProduct(
          productPayload,
        );

      setCreatedProduct(
        newProduct,
      );
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "The product could not be created. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (createdProduct) {
    const createdPrice =
      typeof createdProduct.price ===
      "number"
        ? productPriceFormatter.format(
            createdProduct.price,
          )
        : "Not available";

    return (
      <section className="nani-shop-add-product-page">
        <div className="nani-shop-add-product-success">
          <span
            className="nani-shop-add-product-success-icon"
            aria-hidden="true"
          >
            ✅
          </span>

          <p className="nani-shop-dashboard-page-eyebrow">
            Product submitted
          </p>

          <h2 className="nani-shop-add-product-success-title">
            Product created successfully
          </h2>

          <p className="nani-shop-add-product-success-description">
            DummyJSON accepted the product
            data and returned a generated
            product ID.
          </p>

          <div className="nani-shop-add-product-success-summary">
            <div className="nani-shop-add-product-success-row">
              <span>Generated ID</span>

              <strong>
                {createdProduct.id ??
                  "Not available"}
              </strong>
            </div>

            <div className="nani-shop-add-product-success-row">
              <span>Title</span>

              <strong>
                {createdProduct.title}
              </strong>
            </div>

            <div className="nani-shop-add-product-success-row">
              <span>Category</span>

              <strong>
                {createdProduct.category}
              </strong>
            </div>

            <div className="nani-shop-add-product-success-row">
              <span>Price</span>

              <strong>
                {createdPrice}
              </strong>
            </div>

            <div className="nani-shop-add-product-success-row">
              <span>Stock</span>

              <strong>
                {createdProduct.stock}
              </strong>
            </div>
          </div>

          <div
            className="nani-shop-add-product-demo-warning"
            role="note"
          >
            <span aria-hidden="true">
              ℹ️
            </span>

            <p>
              This demo API simulates product
              creation. The product will not
              remain in the catalogue after
              refreshing the application.
            </p>
          </div>

          <div className="nani-shop-add-product-success-actions">
            <button
              type="button"
              className="nani-shop-add-product-primary-button"
              onClick={
                handleAddAnotherProduct
              }
            >
              Add Another Product
            </button>

            <Link
              to="/products"
              className="nani-shop-add-product-secondary-action"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="nani-shop-add-product-page">
      <div className="nani-shop-add-product-header">
        <div>
          <p className="nani-shop-dashboard-page-eyebrow">
            Product Management
          </p>

          <h2 className="nani-shop-dashboard-page-title">
            Add a New Product
          </h2>

          <p className="nani-shop-dashboard-page-description">
            Enter the product information,
            validate the fields and submit
            it through the centralized API
            service.
          </p>
        </div>

        <div className="nani-shop-add-product-user">
          <span
            className="nani-shop-add-product-user-icon"
            aria-hidden="true"
          >
            👤
          </span>

          <div>
            <span className="nani-shop-add-product-user-label">
              Submitting as
            </span>

            <strong className="nani-shop-add-product-user-name">
              {displayName}
            </strong>
          </div>
        </div>
      </div>

      <form
        className="nani-shop-add-product-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="nani-shop-add-product-form-heading">
          <div>
            <h3 className="nani-shop-add-product-form-title">
              Product Information
            </h3>

            <p className="nani-shop-add-product-form-description">
              Fields marked with an asterisk
              are required.
            </p>
          </div>

          <span className="nani-shop-add-product-protected-label">
            🔐 Protected form
          </span>
        </div>

        {submitError && (
          <div
            className="nani-shop-add-product-submit-error"
            role="alert"
          >
            <span aria-hidden="true">
              ⚠️
            </span>

            <p>{submitError}</p>
          </div>
        )}

        <div className="nani-shop-add-product-form-grid">
          {/* Product title */}

          <div className="nani-shop-form-field nani-shop-add-product-field-full">
            <label
              className="nani-shop-form-label"
              htmlFor="nani-shop-product-title"
            >
              Product title *
            </label>

            <input
              id="nani-shop-product-title"
              className={
                errors.title
                  ? "nani-shop-form-input nani-shop-form-input-error"
                  : "nani-shop-form-input"
              }
              type="text"
              name="title"
              value={formData.title}
              onChange={
                handleInputChange
              }
              onBlur={handleInputBlur}
              placeholder="Example: Wireless Noise-Cancelling Headphones"
              maxLength={80}
              disabled={isSubmitting}
              aria-invalid={
                Boolean(errors.title)
              }
              aria-describedby={
                errors.title
                  ? "nani-shop-product-title-error"
                  : undefined
              }
            />

            {errors.title && (
              <p
                id="nani-shop-product-title-error"
                className="nani-shop-form-field-error"
              >
                {errors.title}
              </p>
            )}
          </div>

          {/* Brand */}

          <div className="nani-shop-form-field">
            <label
              className="nani-shop-form-label"
              htmlFor="nani-shop-product-brand"
            >
              Brand
            </label>

            <input
              id="nani-shop-product-brand"
              className={
                errors.brand
                  ? "nani-shop-form-input nani-shop-form-input-error"
                  : "nani-shop-form-input"
              }
              type="text"
              name="brand"
              value={formData.brand}
              onChange={
                handleInputChange
              }
              onBlur={handleInputBlur}
              placeholder="Example: NANI Audio"
              maxLength={50}
              disabled={isSubmitting}
              aria-invalid={
                Boolean(errors.brand)
              }
              aria-describedby={
                errors.brand
                  ? "nani-shop-product-brand-error"
                  : undefined
              }
            />

            {errors.brand && (
              <p
                id="nani-shop-product-brand-error"
                className="nani-shop-form-field-error"
              >
                {errors.brand}
              </p>
            )}
          </div>

          {/* Category */}

          <div className="nani-shop-form-field">
            <label
              className="nani-shop-form-label"
              htmlFor="nani-shop-product-category"
            >
              Category *
            </label>

            <input
              id="nani-shop-product-category"
              className={
                errors.category
                  ? "nani-shop-form-input nani-shop-form-input-error"
                  : "nani-shop-form-input"
              }
              type="text"
              name="category"
              value={formData.category}
              onChange={
                handleInputChange
              }
              onBlur={handleInputBlur}
              placeholder="Example: audio-accessories"
              maxLength={50}
              disabled={isSubmitting}
              aria-invalid={
                Boolean(
                  errors.category,
                )
              }
              aria-describedby={
                errors.category
                  ? "nani-shop-product-category-error"
                  : undefined
              }
            />

            {errors.category && (
              <p
                id="nani-shop-product-category-error"
                className="nani-shop-form-field-error"
              >
                {errors.category}
              </p>
            )}
          </div>

          {/* Price */}

          <div className="nani-shop-form-field">
            <label
              className="nani-shop-form-label"
              htmlFor="nani-shop-product-price"
            >
              Price in USD *
            </label>

            <input
              id="nani-shop-product-price"
              className={
                errors.price
                  ? "nani-shop-form-input nani-shop-form-input-error"
                  : "nani-shop-form-input"
              }
              type="number"
              name="price"
              value={formData.price}
              onChange={
                handleInputChange
              }
              onBlur={handleInputBlur}
              placeholder="79.99"
              min="0.01"
              step="0.01"
              disabled={isSubmitting}
              aria-invalid={
                Boolean(errors.price)
              }
              aria-describedby={
                errors.price
                  ? "nani-shop-product-price-error"
                  : undefined
              }
            />

            {errors.price && (
              <p
                id="nani-shop-product-price-error"
                className="nani-shop-form-field-error"
              >
                {errors.price}
              </p>
            )}
          </div>

          {/* Stock */}

          <div className="nani-shop-form-field">
            <label
              className="nani-shop-form-label"
              htmlFor="nani-shop-product-stock"
            >
              Stock quantity *
            </label>

            <input
              id="nani-shop-product-stock"
              className={
                errors.stock
                  ? "nani-shop-form-input nani-shop-form-input-error"
                  : "nani-shop-form-input"
              }
              type="number"
              name="stock"
              value={formData.stock}
              onChange={
                handleInputChange
              }
              onBlur={handleInputBlur}
              placeholder="25"
              min="0"
              step="1"
              disabled={isSubmitting}
              aria-invalid={
                Boolean(errors.stock)
              }
              aria-describedby={
                errors.stock
                  ? "nani-shop-product-stock-error"
                  : undefined
              }
            />

            {errors.stock && (
              <p
                id="nani-shop-product-stock-error"
                className="nani-shop-form-field-error"
              >
                {errors.stock}
              </p>
            )}
          </div>

          {/* Discount */}

          <div className="nani-shop-form-field">
            <label
              className="nani-shop-form-label"
              htmlFor="nani-shop-product-discount"
            >
              Discount percentage
            </label>

            <input
              id="nani-shop-product-discount"
              className={
                errors.discountPercentage
                  ? "nani-shop-form-input nani-shop-form-input-error"
                  : "nani-shop-form-input"
              }
              type="number"
              name="discountPercentage"
              value={
                formData.discountPercentage
              }
              onChange={
                handleInputChange
              }
              onBlur={handleInputBlur}
              placeholder="0"
              min="0"
              max="100"
              step="0.01"
              disabled={isSubmitting}
              aria-invalid={
                Boolean(
                  errors.discountPercentage,
                )
              }
              aria-describedby={
                errors.discountPercentage
                  ? "nani-shop-product-discount-error"
                  : undefined
              }
            />

            {errors.discountPercentage && (
              <p
                id="nani-shop-product-discount-error"
                className="nani-shop-form-field-error"
              >
                {
                  errors.discountPercentage
                }
              </p>
            )}
          </div>

          {/* Thumbnail */}

          <div className="nani-shop-form-field nani-shop-add-product-field-full">
            <label
              className="nani-shop-form-label"
              htmlFor="nani-shop-product-thumbnail"
            >
              Thumbnail URL
            </label>

            <input
              id="nani-shop-product-thumbnail"
              className={
                errors.thumbnail
                  ? "nani-shop-form-input nani-shop-form-input-error"
                  : "nani-shop-form-input"
              }
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={
                handleInputChange
              }
              onBlur={handleInputBlur}
              placeholder="https://example.com/product-image.jpg"
              disabled={isSubmitting}
              aria-invalid={
                Boolean(
                  errors.thumbnail,
                )
              }
              aria-describedby={
                errors.thumbnail
                  ? "nani-shop-product-thumbnail-error"
                  : undefined
              }
            />

            {errors.thumbnail && (
              <p
                id="nani-shop-product-thumbnail-error"
                className="nani-shop-form-field-error"
              >
                {errors.thumbnail}
              </p>
            )}
          </div>

          {/* Description */}

          <div className="nani-shop-form-field nani-shop-add-product-field-full">
            <div className="nani-shop-add-product-label-row">
              <label
                className="nani-shop-form-label"
                htmlFor="nani-shop-product-description"
              >
                Description *
              </label>

              <span className="nani-shop-add-product-character-count">
                {
                  formData.description
                    .length
                }
                /500
              </span>
            </div>

            <textarea
              id="nani-shop-product-description"
              className={
                errors.description
                  ? "nani-shop-form-input nani-shop-add-product-textarea nani-shop-form-input-error"
                  : "nani-shop-form-input nani-shop-add-product-textarea"
              }
              name="description"
              value={
                formData.description
              }
              onChange={
                handleInputChange
              }
              onBlur={handleInputBlur}
              placeholder="Describe the main product features, materials and intended use..."
              rows="6"
              maxLength={500}
              disabled={isSubmitting}
              aria-invalid={
                Boolean(
                  errors.description,
                )
              }
              aria-describedby={
                errors.description
                  ? "nani-shop-product-description-error"
                  : undefined
              }
            />

            {errors.description && (
              <p
                id="nani-shop-product-description-error"
                className="nani-shop-form-field-error"
              >
                {errors.description}
              </p>
            )}
          </div>
        </div>

        <div className="nani-shop-add-product-form-actions">
          <button
            type="button"
            className="nani-shop-add-product-reset-button"
            onClick={handleResetForm}
            disabled={isSubmitting}
          >
            Reset Form
          </button>

          <button
            type="submit"
            className="nani-shop-add-product-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Creating Product..."
              : "Create Product"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddProductPage;