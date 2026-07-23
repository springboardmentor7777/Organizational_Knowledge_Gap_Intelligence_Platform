/**
 * Table — design-system wrapper for enterprise data tables.
 * Renders a styled table with header, body, and optional footer.
 */
export default function Table({ children, className = '' }) {
  return (
    <div className={`data-table-wrapper ${className}`}>
      <div className="overflow-x-auto">
        <table className="data-table">
          {children}
        </table>
      </div>
    </div>
  );
}
