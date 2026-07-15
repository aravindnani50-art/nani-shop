import useAuth from "../../hooks/useAuth.js";

function getUserInitials(user) {
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

function DashboardHeader() {
  const {
    user,
    isAuthenticated,
  } = useAuth();

  const displayName =
    isAuthenticated
      ? [user?.firstName, user?.lastName]
          .filter(Boolean)
          .join(" ") ||
        user?.username
      : "Demo Administrator";

  const displayRole =
    isAuthenticated
      ? user?.role || "Authenticated user"
      : "Authentication pending";

  return (
    <header className="nani-shop-dashboard-header">
      <div>
        <p className="nani-shop-dashboard-header-eyebrow">
          NANI Shop Workspace
        </p>

        <h1 className="nani-shop-dashboard-header-title">
          Product Management
        </h1>
      </div>

      <div className="nani-shop-dashboard-user-summary">
        {user?.image ? (
          <img
            className="nani-shop-dashboard-user-avatar"
            src={user.image}
            alt=""
          />
        ) : (
          <span
            className="nani-shop-dashboard-user-avatar"
            aria-hidden="true"
          >
            {getUserInitials(user)}
          </span>
        )}

        <div>
          <p className="nani-shop-dashboard-user-name">
            {displayName}
          </p>

          <p className="nani-shop-dashboard-user-role">
            {displayRole}
          </p>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;