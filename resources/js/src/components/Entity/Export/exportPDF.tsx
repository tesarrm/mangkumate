import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportPDF = (data: any, cols: any, entity: any, orientation: any) => {
    const doc = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: "a4"
    });

    const exportDate = new Date().toLocaleDateString("en-EN", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    let startY = 14; 

    // **Menampilkan Informasi Filter di PDF**
    doc.setFontSize(8);
    doc.text(`Entity: ${entity}`, 14, startY);
    startY += 6;
    doc.text(`Date Export: ${exportDate}`, 14, startY);

    // Ambil header tabel dari cols
    const tableColumn = cols
        .filter(col => col.accessor != "created_at") 
        .map((col: any) => col.title);

    // Ambil data dari data dengan kolom yang sesuai dari cols
    const tableRows = data.map((row: any, index: number) => {
        return cols
            .filter(col => col.accessor != "created_at") 
            .map((col: any) => {
                if (col.accessor === "no") return index + 1; 
                return row[col.accessor] ?? "-"; 
            });
    });

    // **Tampilkan Tabel**
    autoTable(doc, {
        startY: startY + 8,
        head: [tableColumn],
        body: tableRows,
        styles: { 
            fontSize: 8, 
            cellPadding: 2,
            lineWidth: 0.1, 
        },
        theme: "grid", 
        headStyles: { 
            fillColor: false, 
            fontStyle: "bold", 
            textColor: 0,
            lineWidth: 0.1,
        },
        columnStyles: {
            0: { cellWidth: 10 } 
        }
    });

    // **Pratinjau PDF di Tab Baru**
    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl);
};

export default exportPDF;