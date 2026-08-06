/**
 * Export array of data objects to CSV file for Excel / Spreadsheet import
 */
export const exportToCSV = (data, filename = 'export') => {
  if (!data || !data.length) {
    alert('No data available to export.');
    return;
  }

  // Extract CSV headers
  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Header row
  csvRows.push(headers.join(','));

  // Data rows
  for (const row of data) {
    const values = headers.map(header => {
      let val = row[header] === undefined || row[header] === null ? '' : row[header];
      if (typeof val === 'object') {
        val = JSON.stringify(val);
      }
      const escaped = ('' + val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Print & Export report data to formatted PDF Document
 */
export const exportToPDF = (title, subtitle, headers, rows, filename = 'report') => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to generate PDF report.');
    return;
  }

  const tableHeadersHtml = headers.map(h => `<th style="background:#1e1b4b;color:#a5b4fc;padding:10px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;border:1px solid #312e81;">${h}</th>`).join('');
  
  const tableRowsHtml = rows.map((row, idx) => {
    const bg = idx % 2 === 0 ? '#0f172a' : '#1e293b';
    const cells = row.map(cell => `<td style="padding:10px;color:#e2e8f0;font-size:12px;border:1px solid #334155;">${cell}</td>`).join('');
    return `<tr style="background:${bg};">${cells}</tr>`;
  }).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: 'Helvetica', 'Arial', sans-serif; background: #09090b; color: #f8fafc; margin: 0; padding: 40px; }
          .header { border-bottom: 2px solid #6366f1; padding-bottom: 15px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
          h1 { margin: 0; color: #ffffff; font-size: 24px; letter-spacing: -0.5px; }
          p.sub { margin: 5px 0 0 0; color: #818cf8; font-size: 13px; }
          .meta { text-align: right; color: #64748b; font-size: 11px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .footer { margin-top: 40px; text-align: center; color: #475569; font-size: 10px; border-top: 1px solid #1e293b; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>OKGIP – ${title}</h1>
            <p class="sub">${subtitle}</p>
          </div>
          <div class="meta">
            <p>Generated: ${new Date().toLocaleString()}</p>
            <p>Platform Intelligence Report</p>
          </div>
        </div>
        <table>
          <thead><tr>${tableHeadersHtml}</tr></thead>
          <tbody>${tableRowsHtml}</tbody>
        </table>
        <div class="footer">
          Organizational Knowledge Gap Intelligence Platform &bull; Automated Enterprise Analytics Report
        </div>
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};
