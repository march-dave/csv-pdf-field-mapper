'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import jsPDF from 'jspdf';

export default function Home() {
  const [csvData, setCsvData] = useState<string[][]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<string[]>(file, {
      complete: (results) => {
        setCsvData(results.data as string[][]);
      },
    });
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    csvData.forEach((row, index) => {
      doc.text(row.join(', '), 10, 10 + index * 10);
    });
    doc.save('data.pdf');
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>CSV to PDF</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {csvData.length > 0 && (
        <button onClick={handleDownloadPdf} style={{ marginLeft: 10 }}>
          Download PDF
        </button>
      )}
    </main>
  );
}
