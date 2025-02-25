import { saveAs } from "file-saver";
import Papa from "papaparse";

// const exportCSV = (data: any, cols: any, filters: any, storeName: any, entity: any) => {
const exportCSV = (data: any, cols: any, entity: any) => {
    const exportDate = new Date().toLocaleDateString("en-EN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // **Header Informasi**
    const infoRows = [
        [`Entity: ${entity}`],
        [`Date Export: ${exportDate}`],
    ];

    infoRows.push([""]); // Baris kosong sebagai pemisah

    // **Header Kolom**
    const tableHeaders = cols
        // .map((col: any) => col.title);
        .filter(col => col.accessor != "created_at") 
        .map((col: any) => col.accessor);

    // **Data Isi Tabel**
    const tableRows = data.map((row: any, index: any) =>
        cols
            .filter(col => col.accessor != "created_at") 
            .map((col: any) => (col.accessor === "no" ? index + 1 : row[col.accessor] ?? "-"))
    );

    // **Gabungkan Data**
    const finalData = [...infoRows, tableHeaders, ...tableRows];

    // **Konversi ke CSV**
    const csvString = Papa.unparse(finalData, { delimiter: "," });

    // **Simpan File**
    const fileName = `Export_${entity}_${exportDate}.csv`;
    const csvBlob = new Blob([csvString], { type: "text/csv;charset=utf-8" });

    saveAs(csvBlob, fileName);
};

export default exportCSV;
