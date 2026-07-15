import { Outlet } from "react-router";

import DashboardHeader from "../components/layout/DashboardHeader.jsx";
import DashboardSidebar from "../components/layout/DashboardSidebar.jsx";

function DashboardLayout() {
  return (
    <section className="nani-shop-dashboard-page">
      <div className="nani-shop-dashboard-container">
        <DashboardSidebar />

        <div className="nani-shop-dashboard-workspace">
          <DashboardHeader />

          <div className="nani-shop-dashboard-child-content">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardLayout;