import  useTheme  from "../../hooks/useTheme.js";

function ThemeToggle() {
  const {
    isDarkTheme,
    toggleTheme,
  } = useTheme();

  const nextThemeName = isDarkTheme
    ? "light"
    : "dark";

  return (
    <button
      type="button"
      className="nani-shop-theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextThemeName} theme`}
      aria-pressed={isDarkTheme}
      title={`Switch to ${nextThemeName} theme`}
    >
      <span
        className="nani-shop-theme-toggle-icon"
        aria-hidden="true"
      >
        {isDarkTheme ? "☀️" : "🌙"}
      </span>

      <span className="nani-shop-theme-toggle-label">
        {isDarkTheme ? "Light" : "Dark"}
      </span>
    </button>
  );
}

export default ThemeToggle;