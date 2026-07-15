function validateLoginForm(formData) {
  const validationErrors = {};

  const normalizedUsername =
    formData.username.trim();

  if (!normalizedUsername) {
    validationErrors.username =
      "Username is required.";
  } else if (
    normalizedUsername.length < 3
  ) {
    validationErrors.username =
      "Username must contain at least 3 characters.";
  }

  if (!formData.password) {
    validationErrors.password =
      "Password is required.";
  } else if (
    formData.password.length < 6
  ) {
    validationErrors.password =
      "Password must contain at least 6 characters.";
  }

  return validationErrors;
}

export { validateLoginForm };