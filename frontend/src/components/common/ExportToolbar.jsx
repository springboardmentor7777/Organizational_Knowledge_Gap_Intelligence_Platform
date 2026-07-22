import { useState } from 'react';
import {
  exportToCSV,
  printReport,
  exportToPDF,
  exportToExcel,
} from '../../utils/exportUtils';

/**
 * Reusable Export & Reporting Toolbar component.
 * Provides instant CSV export and Print functionality while offering
 * backend-ready PDF and Excel export triggers with user feedback.
 */
export default function ExportToolbar({
  data = [],
  columns = [],
  filename = 'report',
  title = 'Export Options',
}) {
  const [loadingType, setLoadingType] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType]       = useState('info');

  const showNotification = (msg, type = 'info') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // CSV Export Handler
  const handleCSVExport = () => {
    try {
      if (!data || data.length === 0) {
        showNotification('No visible data to export.', 'warning');
        return;
      }
      exportToCSV(data, columns, filename);
      showNotification(`Successfully exported ${data.length} rows to CSV.`, 'success');
    } catch (err) {
      showNotification(err.message || 'Failed to export CSV.', 'error');
    }
  };

  // Print Handler
  const handlePrint = () => {
    printReport();
  };

  // PDF Export Handler (Backend Ready)
  const handlePDFExport = () => {
    setLoadingType('pdf');
    exportToPDF(filename)
      .then((res) => {
        setLoadingType(null);
        showNotification(res.message, 'info');
      })
      .catch(() => {
        setLoadingType(null);
        showNotification('Failed to generate PDF report.', 'error');
      });
  };

  // Excel Export Handler (Backend Ready)
  const handleExcelExport = () => {
    setLoadingType('excel');
    exportToExcel(filename)
      .then((res) => {
        setLoadingType(null);
        showNotification(res.message, 'info');
      })
      .catch(() => {
        setLoadingType(null);
        showNotification('Failed to generate Excel report.', 'error');
      });
  };

  return (
    <div className="no-print space-y-2">
      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-xl shadow-sm border border-gray-200 p-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">{title}</span>
          <span className="text-xs text-gray-400 font-medium">({data.length} items visible)</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* CSV Export Button */}
          <button
            type="button"
            onClick={handleCSVExport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors shadow-xs"
          >
            <span>📥</span>
            <span>Export CSV</span>
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors shadow-xs"
          >
            <span>🖨️</span>
            <span>Print Report</span>
          </button>

          {/* PDF Export Button (Backend Placeholder) */}
          <button
            type="button"
            onClick={handlePDFExport}
            disabled={loadingType === 'pdf'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors shadow-xs disabled:opacity-50"
          >
            {loadingType === 'pdf' ? (
              <span className="w-3.5 h-3.5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>📄</span>
            )}
            <span>Export PDF</span>
          </button>

          {/* Excel Export Button (Backend Placeholder) */}
          <button
            type="button"
            onClick={handleExcelExport}
            disabled={loadingType === 'excel'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors shadow-xs disabled:opacity-50"
          >
            {loadingType === 'excel' ? (
              <span className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>📊</span>
            )}
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Notification Toast Banner */}
      {toastMessage && (
        <div
          className={`p-3 rounded-lg text-xs font-medium border shadow-sm transition-all duration-200 flex items-center justify-between ${
            toastType === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : toastType === 'warning'
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : toastType === 'error'
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-blue-50 text-blue-800 border-blue-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>ℹ️</span>
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-gray-600 font-bold ml-2"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
