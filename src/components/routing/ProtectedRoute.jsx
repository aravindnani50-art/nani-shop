import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router";

import useAuth from "../../hooks/useAuth.js";

function ProtectedRoute() {
  const location = useLocation();

  const {
    isAuthenticated,
    isAuthLoading,
  } = useAuth();


  if (isAuthLoading) {
    return (
      <section
        className="nani-shop-login-page"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="nani-shop-authenticated-card">
          <p className="nani-shop-page-eyebrow">
            Authentication
          </p>

          <h1 className="nani-shop-authenticated-title">
            Checking your session…
          </h1>

          <p className="nani-shop-authenticated-description">
            Please wait while NANI Shop verifies
            your account session.
          </p>
        </div>
      </section>
    );
  }

  
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

 
  return <Outlet />;
}

export default ProtectedRoute;