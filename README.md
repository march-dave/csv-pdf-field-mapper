# CSV to PDF Next.js Project

This project is a minimal Next.js application that allows you to upload a CSV file and download its contents as a PDF document.

## Features

- **Next.js & React** – built using Next.js with the App Router and React components.
- **CSV parsing** – uses `papaparse` to read CSV files in the browser.
- **PDF generation** – uses `jspdf` to create a downloadable PDF from the parsed CSV data.

## Getting Started

1. Install dependencies (requires Node.js):
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to view the app.

Upload a CSV file and click **Download PDF** to save the contents.
