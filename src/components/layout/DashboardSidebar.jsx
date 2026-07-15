import { NavLink } from "react-router";

function getDashboardLinkClass({ isActive }) {
  return isActive
    ? "nani-shop-dashboard-navigation-link nani-shop-dashboard-navigation-link-active"
    : "nani-shop-dashboard-navigation-link";
}

function DashboardSidebar() {
  return (
    <aside className="nani-shop-dashboard-sidebar">
      <div className="nani-shop-dashboard-sidebar-heading">
        <p className="nani-shop-dashboard-sidebar-eyebrow">
          Management
        </p>

        <h2 className="nani-shop-dashboard-sidebar-title">
          Admin Dashboard
        </h2>
      </div>

      <nav
        className="nani-shop-dashboard-navigation"
        aria-label="Dashboard navigation"
      >
        <NavLink
          to="/dashboard"
          end
          className={getDashboardLinkClass}
        >
          <span aria-hidden="true">🏠</span>
          Dashboard Home
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={getDashboardLinkClass}
        >
          <span aria-hidden="true">👤</span>
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/add-product"
          className={getDashboardLinkClass}
        >
          <span aria-hidden="true">➕</span>
          Add Product
        </NavLink>
      </nav>
    </aside>
  );
}

export default DashboardSidebar;