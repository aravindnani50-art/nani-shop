function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}) {
  return (
    <section
      className="nani-shop-error-state"
      role="alert"
    >
      <span
        className="nani-shop-error-state-icon"
        aria-hidden="true"
      >
        ⚠️
      </span>

      <h2 className="nani-shop-error-state-title">
        {title}
      </h2>

      <p className="nani-shop-error-state-message">
        {message ||
          "The requested information could not be loaded."}
      </p>

      {onRetry && (
        <button
          type="button"
          className="nani-shop-error-state-retry-button"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}
    </section>
  );
}

export default ErrorState;