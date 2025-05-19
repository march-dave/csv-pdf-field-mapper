'use client';

import { useState, useRef } from 'react';
import Papa from 'papaparse';
import jsPDF from 'jspdf';

export default function Home() {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    Papa.parse<string[]>(file, {
      complete: (results) => {
        setCsvData(results.data as string[][]);
      },
    });
  };

  // 드래그앤드롭 UI용 (기능은 미구현)
  const handleDropAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    csvData.forEach((row, index) => {
      doc.text(row.join(', '), 10, 10 + index * 10);
    });
    doc.save('data.pdf');
  };

  return (
    <main className="csvpdf-main">
      <div className="csvpdf-card">
        <div className="csvpdf-icon">📄</div>
        <h1 className="csvpdf-title">CSV to PDF</h1>
        <p className="csvpdf-desc">Easily and quickly convert your CSV file to PDF.<br/>Upload a file to preview and convert it.</p>
        <div className="csvpdf-upload-area" onClick={handleDropAreaClick}>
          <div className="csvpdf-upload-text">
            {fileName ? (
              <span className="csvpdf-filename">{fileName}</span>
            ) : (
              <>
                <span className="csvpdf-upload-icon">⬆️</span><br/>
                <span>Drag & drop or click to upload your CSV file</span>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        {csvData.length > 0 && (
          <>
            <button className="csvpdf-btn" onClick={handleDownloadPdf}>Download as PDF</button>
            <div className="csvpdf-table-wrap">
              <table className="csvpdf-table">
                <tbody>
                  {csvData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <footer className="csvpdf-footer">© 2024 CSV to PDF Service</footer>
    </main>
  );
}
