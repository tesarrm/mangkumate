import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportExcel = (data: any, cols: any, entity: any) => {
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
    // const tableHeaders = cols.map((col: any) => col.title);
    const tableHeaders = cols
        .filter(col => col.accessor != "created_at") 
        .map((col: any) => col.accessor);

    // **Data Isi Tabel**
    const tableRows = data.map((row: any, index: number) =>
        cols
            .filter(col => col.accessor != "created_at") 
            .map((col: any) => (col.accessor === "no" ? index + 1 : row[col.accessor] ?? "-"))
    );

    // **Gabungkan Data**
    const finalData = [...infoRows, tableHeaders, ...tableRows];

    // **Buat Workbook & Sheet**
    const ws = XLSX.utils.aoa_to_sheet(finalData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Export");

    // **Simpan File**
    const fileName = `Export_${entity}_${exportDate}.xlsx`;
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(excelBlob, fileName);
};

export default exportExcel;