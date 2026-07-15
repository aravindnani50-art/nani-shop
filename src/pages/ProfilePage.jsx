import { Link } from "react-router";

import useAuth from "../hooks/useAuth.js";

function getDisplayName(user) {
  return (
    [user?.firstName, user?.lastName]
      .filter(Boolean)
      .join(" ") ||
    user?.username ||
    "NANI Shop user"
  );
}

function getInitials(user) {
  const firstInitial =
    user?.firstName
      ?.charAt(0)
      .toUpperCase() ?? "";

  const lastInitial =
    user?.lastName
      ?.charAt(0)
      .toUpperCase() ?? "";

  return (
    `${firstInitial}${lastInitial}` ||
    "NS"
  );
}

function ProfilePage() {
  const {
    user,
    isAuthenticated,
  } = useAuth();

  if (!isAuthenticated) {
    return (
      <section className="nani-shop-dashboard-profile-page">
        <div className="nani-shop-dashboard-page-heading">
          <p className="nani-shop-dashboard-page-eyebrow">
            Account
          </p>

          <h2 className="nani-shop-dashboard-page-title">
            Sign in to view your profile
          </h2>

          <p className="nani-shop-dashboard-page-description">
            Authentication is working.
            Dashboard route protection will
            be added in Stage 9.
          </p>
        </div>

        <Link
          to="/login"
          className="nani-shop-primary-action"
        >
          Go to Login
        </Link>
      </section>
    );
  }

  return (
    <section className="nani-shop-dashboard-profile-page">
      <div className="nani-shop-dashboard-page-heading">
        <p className="nani-shop-dashboard-page-eyebrow">
          Account
        </p>

        <h2 className="nani-shop-dashboard-page-title">
          Administrator Profile
        </h2>

        <p className="nani-shop-dashboard-page-description">
          This information is shared from
          AuthContext after successful login.
        </p>
      </div>

      <div className="nani-shop-profile-card">
        {user?.image ? (
          <img
            className="nani-shop-profile-avatar"
            src={user.image}
            alt=""
          />
        ) : (
          <div
            className="nani-shop-profile-avatar"
            aria-hidden="true"
          >
            {getInitials(user)}
          </div>
        )}

        <div className="nani-shop-profile-information">
          <div className="nani-shop-profile-information-row">
            <span className="nani-shop-profile-information-label">
              Display name
            </span>

            <strong className="nani-shop-profile-information-value">
              {getDisplayName(user)}
            </strong>
          </div>

          <div className="nani-shop-profile-information-row">
            <span className="nani-shop-profile-information-label">
              Username
            </span>

            <strong className="nani-shop-profile-information-value">
              {user.username ||
                "Not available"}
            </strong>
          </div>

          <div className="nani-shop-profile-information-row">
            <span className="nani-shop-profile-information-label">
              Email
            </span>

            <strong className="nani-shop-profile-information-value">
              {user.email ||
                "Not available"}
            </strong>
          </div>

          <div className="nani-shop-profile-information-row">
            <span className="nani-shop-profile-information-label">
              Role
            </span>

            <strong className="nani-shop-profile-information-value">
              {user.role ||
                "Authenticated user"}
            </strong>
          </div>

          <div className="nani-shop-profile-information-row">
            <span className="nani-shop-profile-information-label">
              Authentication
            </span>

            <strong className="nani-shop-profile-information-value">
              Signed in
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;