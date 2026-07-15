function DashboardHomePage() {
  return (
    <section className="nani-shop-dashboard-home-page">
      <div className="nani-shop-dashboard-page-heading">
        <p className="nani-shop-dashboard-page-eyebrow">
          Overview
        </p>

        <h2 className="nani-shop-dashboard-page-title">
          Welcome to your dashboard
        </h2>

        <p className="nani-shop-dashboard-page-description">
          Review the shop overview, manage products and access your
          administrator profile.
        </p>
      </div>

      <div className="nani-shop-dashboard-stat-grid">
        <article className="nani-shop-dashboard-stat-card">
          <span
            className="nani-shop-dashboard-stat-icon"
            aria-hidden="true"
          >
            📦
          </span>

          <p className="nani-shop-dashboard-stat-label">
            Product catalogue
          </p>

          <strong className="nani-shop-dashboard-stat-value">
            API ready
          </strong>
        </article>

        <article className="nani-shop-dashboard-stat-card">
          <span
            className="nani-shop-dashboard-stat-icon"
            aria-hidden="true"
          >
            🔎
          </span>

          <p className="nani-shop-dashboard-stat-label">
            Product search
          </p>

          <strong className="nani-shop-dashboard-stat-value">
            Coming soon
          </strong>
        </article>

        <article className="nani-shop-dashboard-stat-card">
          <span
            className="nani-shop-dashboard-stat-icon"
            aria-hidden="true"
          >
            🔐
          </span>

          <p className="nani-shop-dashboard-stat-label">
            Authentication
          </p>

          <strong className="nani-shop-dashboard-stat-value">
            Stage 8
          </strong>
        </article>
      </div>
    </section>
  );
}

export default DashboardHomePage;