const PRODUCT_FORM_FIELDS = [
  "title",
  "brand",
  "category",
  "price",
  "stock",
  "discountPercentage",
  "thumbnail",
  "description",
];

function isValidHttpUrl(value) {
  try {
    const parsedUrl = new URL(value);

    return (
      parsedUrl.protocol === "http:" ||
      parsedUrl.protocol === "https:"
    );
  } catch {
    return false;
  }
}

function validateProductForm(formData) {
  const validationErrors = {};

  const title = formData.title.trim();
  const brand = formData.brand.trim();
  const category = formData.category.trim();
  const priceText = formData.price.trim();
  const stockText = formData.stock.trim();
  const discountText =
    formData.discountPercentage.trim();
  const thumbnail = formData.thumbnail.trim();
  const description =
    formData.description.trim();

  if (!title) {
    validationErrors.title =
      "Product title is required.";
  } else if (title.length < 3) {
    validationErrors.title =
      "Product title must contain at least 3 characters.";
  } else if (title.length > 80) {
    validationErrors.title =
      "Product title cannot exceed 80 characters.";
  }

  if (brand.length > 50) {
    validationErrors.brand =
      "Brand name cannot exceed 50 characters.";
  }

  if (!category) {
    validationErrors.category =
      "Product category is required.";
  } else if (category.length < 2) {
    validationErrors.category =
      "Category must contain at least 2 characters.";
  } else if (category.length > 50) {
    validationErrors.category =
      "Category cannot exceed 50 characters.";
  }

  if (!priceText) {
    validationErrors.price =
      "Product price is required.";
  } else {
    const price = Number(priceText);

    if (!Number.isFinite(price)) {
      validationErrors.price =
        "Enter a valid product price.";
    } else if (price <= 0) {
      validationErrors.price =
        "Product price must be greater than 0.";
    } else if (price > 1000000) {
      validationErrors.price =
        "Product price is too large.";
    }
  }

  if (!stockText) {
    validationErrors.stock =
      "Stock quantity is required.";
  } else {
    const stock = Number(stockText);

    if (!Number.isInteger(stock)) {
      validationErrors.stock =
        "Stock must be a whole number.";
    } else if (stock < 0) {
      validationErrors.stock =
        "Stock cannot be negative.";
    } else if (stock > 100000) {
      validationErrors.stock =
        "Stock quantity is too large.";
    }
  }

  if (discountText) {
    const discountPercentage =
      Number(discountText);

    if (
      !Number.isFinite(
        discountPercentage,
      )
    ) {
      validationErrors.discountPercentage =
        "Enter a valid discount percentage.";
    } else if (
      discountPercentage < 0 ||
      discountPercentage > 100
    ) {
      validationErrors.discountPercentage =
        "Discount must be between 0 and 100.";
    }
  }

  if (
    thumbnail &&
    !isValidHttpUrl(thumbnail)
  ) {
    validationErrors.thumbnail =
      "Thumbnail must be a valid HTTP or HTTPS URL.";
  }

  if (!description) {
    validationErrors.description =
      "Product description is required.";
  } else if (description.length < 10) {
    validationErrors.description =
      "Description must contain at least 10 characters.";
  } else if (
    description.length > 500
  ) {
    validationErrors.description =
      "Description cannot exceed 500 characters.";
  }

  return validationErrors;
}

function createProductPayload(formData) {
  const productPayload = {
    title: formData.title.trim(),
    category: formData.category.trim(),
    price: Number(formData.price),
    stock: Number(formData.stock),
    discountPercentage:
      formData.discountPercentage.trim()
        ? Number(
            formData.discountPercentage,
          )
        : 0,
    description:
      formData.description.trim(),
  };

  const brand = formData.brand.trim();
  const thumbnail =
    formData.thumbnail.trim();

  if (brand) {
    productPayload.brand = brand;
  }

  if (thumbnail) {
    productPayload.thumbnail =
      thumbnail;
  }

  return productPayload;
}

export {
  PRODUCT_FORM_FIELDS,
  createProductPayload,
  validateProductForm,
};