/**
 * exportUtils.js
 * Reusable utility functions for CSV export, Browser Printing, and Backend-ready PDF/Excel reporting.
 */

/**
 * Escapes a single CSV cell value to handle commas, quotes, and newlines.
 */
function escapeCSVCell(value) {
  if (value === null || value === undefined) return '""';
  let stringValue = String(value);
  // Handle arrays or objects gracefully
  if (Array.isArray(value)) {
    stringValue = value.join('; ');
  } else if (typeof value === 'object') {
    stringValue = JSON.stringify(value);
  }
  // Escape double quotes by doubling them
  stringValue = stringValue.replace(/"/g, '""');
  return `"${stringValue}"`;
}

/**
 * Exports JSON data array to CSV and triggers a browser download.
 * @param {Array<Object>} data - Filtered/sorted list of rows to export.
 * @param {Array<{label: string, key: string}>} columns - Column mapping definitions.
 * @param {string} filename - Target filename (without extension).
 */
export function exportToCSV(data, columns, filename = 'report') {
  if (!data || data.length === 0) {
    throw new Error('No data available to export.');
  }

  // Build CSV Header row
  const headerRow = columns.map((col) => escapeCSVCell(col.label)).join(',');

  // Build CSV Data rows
  const dataRows = data.map((row) => {
    return columns
      .map((col) => {
        const val = row[col.key] !== undefined ? row[col.key] : '';
        return escapeCSVCell(val);
      })
      .join(',');
  });

  const csvContent = [headerRow, ...dataRows].join('\r\n');

  // Create downloadable blob
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Triggers native browser print dialog with print stylesheet formatting.
 */
export function printReport() {
  window.print();
}

/**
 * Backend-ready PDF export handler.
 * Simulates API request or calls backend endpoint when available.
 */
export function exportToPDF(reportType = 'report', filename = 'report') {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'backend_ready',
        message: `PDF export requested for ${reportType}. (Backend endpoint will generate binary PDF once connected)`,
      });
    }, 600);
  });
}

/**
 * Backend-ready Excel export handler.
 * Simulates API request or calls backend endpoint when available.
 */
export function exportToExcel(reportType = 'report', filename = 'report') {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'backend_ready',
        message: `Excel XLSX export requested for ${reportType}. (Backend endpoint will generate .xlsx spreadsheet once connected)`,
      });
    }, 600);
  });
}
