import { Outlet } from "react-router";

import MainNavigation from "../components/layout/MainNavigation.jsx";

function RootLayout() {
  return (
    <div className="nani-shop-root-layout">
      <MainNavigation />

      <main className="nani-shop-main-content">
        <Outlet />
      </main>

      <footer className="nani-shop-main-footer">
        <p className="nani-shop-footer-text">
          © 2026 NANI Shop — Product Explorer and Admin Dashboard
        </p>
      </footer>
    </div>
  );
}

export default RootLayout;