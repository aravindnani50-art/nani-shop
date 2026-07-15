import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router";

import useAuth from "../hooks/useAuth.js";
import {
  validateLoginForm,
} from "../utils/authValidation.js";

const INITIAL_FORM_DATA = {
  username: "",
  password: "",
};

const DEMO_CREDENTIALS = {
  username: "emilys",
  password: "emilyspass",
};

function createDestinationPath(
  requestedLocation,
) {
  if (!requestedLocation?.pathname) {
    return "/dashboard";
  }

  const pathname =
    requestedLocation.pathname;

  const search =
    requestedLocation.search ?? "";

  const hash =
    requestedLocation.hash ?? "";

  return `${pathname}${search}${hash}`;
}

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    user,
    isAuthenticated,
    login,
    logout,
  } = useAuth();

  const [formData, setFormData] =
    useState(INITIAL_FORM_DATA);

  const [errors, setErrors] =
    useState({});

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const requestedLocation =
    location.state?.from;

  const destinationPath =
    createDestinationPath(
      requestedLocation,
    );

  function handleInputChange(event) {
    const { name, value } =
      event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = {
        ...currentErrors,
      };

      delete nextErrors[name];

      return nextErrors;
    });

    if (submitError) {
      setSubmitError("");
    }
  }

  function handleUseDemoCredentials() {
    setFormData(DEMO_CREDENTIALS);
    setErrors({});
    setSubmitError("");
  }

  function handleTogglePassword() {
    setShowPassword(
      (currentValue) =>
        !currentValue,
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors =
      validateLoginForm(formData);

    if (
      Object.keys(
        validationErrors,
      ).length > 0
    ) {
      setErrors(validationErrors);
      setSubmitError("");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await login(formData);

      navigate(destinationPath, {
        replace: true,
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleLogout() {
    logout();

    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSubmitError("");
    setShowPassword(false);
  }

  if (isAuthenticated) {
    const displayName =
      [user?.firstName, user?.lastName]
        .filter(Boolean)
        .join(" ") ||
      user?.username ||
      "NANI Shop user";

    return (
      <section className="nani-shop-login-page">
        <div className="nani-shop-authenticated-card">
          {user?.image ? (
            <img
              className="nani-shop-authenticated-user-image"
              src={user.image}
              alt={`${displayName} profile`}
            />
          ) : (
            <span
              className="nani-shop-authenticated-user-fallback"
              aria-hidden="true"
            >
              NS
            </span>
          )}

          <p className="nani-shop-page-eyebrow">
            Already authenticated
          </p>

          <h1 className="nani-shop-authenticated-title">
            Welcome back, {displayName}.
          </h1>

          <p className="nani-shop-authenticated-description">
            Your demo session is active.
            Continue to the dashboard or
            log out and use another account.
          </p>

          <div className="nani-shop-authenticated-actions">
            <Link
              to="/dashboard"
              className="nani-shop-primary-action"
            >
              Open Dashboard
            </Link>

            <button
              type="button"
              className="nani-shop-authenticated-logout-button"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="nani-shop-login-page">
      <div className="nani-shop-login-layout">
        <div className="nani-shop-login-information">
          <p className="nani-shop-page-eyebrow">
            Account Access
          </p>

          <h1 className="nani-shop-login-page-title">
            Welcome back to NANI Shop.
          </h1>

          <p className="nani-shop-login-page-description">
            Sign in to access the product
            management dashboard and profile.
          </p>

          <div className="nani-shop-login-demo-panel">
            <p className="nani-shop-login-demo-title">
              Demo credentials
            </p>

            <dl className="nani-shop-login-demo-list">
              <div className="nani-shop-login-demo-row">
                <dt>Username</dt>
                <dd>emilys</dd>
              </div>

              <div className="nani-shop-login-demo-row">
                <dt>Password</dt>
                <dd>emilyspass</dd>
              </div>
            </dl>

            <button
              type="button"
              className="nani-shop-login-demo-button"
              onClick={
                handleUseDemoCredentials
              }
            >
              Fill Demo Credentials
            </button>
          </div>
        </div>

        <div className="nani-shop-login-form-panel">
          <form
            className="nani-shop-login-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="nani-shop-login-form-heading">
              <h2 className="nani-shop-login-form-title">
                Sign In
              </h2>

              <p className="nani-shop-login-form-description">
                Enter your DummyJSON
                account credentials.
              </p>
            </div>

            {submitError && (
              <div
                className="nani-shop-login-submit-error"
                role="alert"
              >
                <span aria-hidden="true">
                  ⚠️
                </span>

                <p>{submitError}</p>
              </div>
            )}

            <div className="nani-shop-form-field">
              <label
                className="nani-shop-form-label"
                htmlFor="nani-shop-login-username"
              >
                Username
              </label>

              <input
                id="nani-shop-login-username"
                className={
                  errors.username
                    ? "nani-shop-form-input nani-shop-form-input-error"
                    : "nani-shop-form-input"
                }
                type="text"
                name="username"
                value={formData.username}
                onChange={
                  handleInputChange
                }
                autoComplete="username"
                placeholder="Enter your username"
                aria-invalid={
                  Boolean(
                    errors.username,
                  )
                }
                aria-describedby={
                  errors.username
                    ? "nani-shop-login-username-error"
                    : undefined
                }
                disabled={isSubmitting}
              />

              {errors.username && (
                <p
                  id="nani-shop-login-username-error"
                  className="nani-shop-form-field-error"
                >
                  {errors.username}
                </p>
              )}
            </div>

            <div className="nani-shop-form-field">
              <label
                className="nani-shop-form-label"
                htmlFor="nani-shop-login-password"
              >
                Password
              </label>

              <div className="nani-shop-password-control">
                <input
                  id="nani-shop-login-password"
                  className={
                    errors.password
                      ? "nani-shop-form-input nani-shop-password-input nani-shop-form-input-error"
                      : "nani-shop-form-input nani-shop-password-input"
                  }
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={
                    handleInputChange
                  }
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  aria-invalid={
                    Boolean(
                      errors.password,
                    )
                  }
                  aria-describedby={
                    errors.password
                      ? "nani-shop-login-password-error"
                      : undefined
                  }
                  disabled={isSubmitting}
                />

                <button
                  type="button"
                  className="nani-shop-password-toggle-button"
                  onClick={
                    handleTogglePassword
                  }
                  disabled={isSubmitting}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>

              {errors.password && (
                <p
                  id="nani-shop-login-password-error"
                  className="nani-shop-form-field-error"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="nani-shop-login-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Signing In..."
                : "Sign In"}
            </button>

            <p className="nani-shop-login-security-note">
              This is demonstration
              authentication using a
              placeholder API.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;