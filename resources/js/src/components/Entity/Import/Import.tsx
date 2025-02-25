import React, { FC, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import PreviewImport from "./PreviewImport";
import Breadcrumb from "../../Breadcumb";
import toast from 'react-hot-toast';
import { useLocation } from "react-router-dom";
import { useCrudApi } from "../../../redux/features/api/useCrudApi";

const entityUrl = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const entity = pathnames[0];

    return entity;
}

const Import = () => {
    const { 
        useImportDataMutation,
        useImportUpdateDataMutation,
    } = useCrudApi(entityUrl());
    const [importType, setImportType] = useState("Insert New Records");
    const importMutation = importType === "Insert New Records" ? useImportDataMutation : useImportUpdateDataMutation;
    const [importData, {isSuccess: isSuccessImport, error: errorImport}] = importMutation();
    const [dataPreview, setDataPreview] = useState([]);
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);

        if (uploadedFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target.result;

                if (uploadedFile.name.endsWith(".csv")) {
                    Papa.parse(content, {
                        header: false, // Jangan pakai header otomatis dari PapaParse
                        skipEmptyLines: true,
                        complete: (result) => {
                            const rawData = result.data;

                            if (rawData.length < 2) {
                                console.error("File harus memiliki minimal 2 baris data!");
                                return;
                            }

                            const headers = rawData[2]; // Gunakan baris ke-2 sebagai header
                            const filteredData = rawData.slice(3).map((row) =>
                                Object.fromEntries(headers.map((header, index) => [header, row[index]]))
                            );

                            setDataPreview(filteredData.slice(0, 5)); // Batasi preview hanya 5 data
                            setData(filteredData);
                        },
                    });
                } else if (uploadedFile.name.endsWith(".xlsx")) {
                    const workbook = XLSX.read(content, { type: "binary" });
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                    const headers = jsonData[3];
                    const rows = jsonData.slice(4).map((row) =>
                        Object.fromEntries(headers.map((header, index) => [header, row[index]]))
                    );

                    setDataPreview(rows.slice(0, 5)); // Batasi preview hanya 5 data
                    setData(rows)
                }
            };

            reader.readAsBinaryString(uploadedFile);
        }
    };

    const handleImport = async () => {
        if (!file) return alert("Pilih file terlebih dahulu!");

        await importData({data});
    };

    // scroll
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20); // Aktif jika scroll lebih dari 20px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isSuccessImport) {
            toast.success("Update/Create Successfully")
        }
    }, [isSuccessImport])

    return (
        <div>
            <div className={`sticky top-14 z-10 flex items-center justify-between flex-wrap gap-4 mb-5 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm mx-[-1.50rem] px-6 py-4" : ""}`}>
                <Breadcrumb />

                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="relative">
                        <div className="flex items-center gap-2">
                            <button type="button" onClick={handleImport} className="btn btn-primary">
                                Import
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="panel">
                <div className="mb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                        <div>
                            <label htmlFor="file_excel_csv">File Excel/CSV</label>
                            <input
                                id="file_excel_csv"
                                type="file"
                                accept=".csv,.xlsx"
                                className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                onChange={handleFileChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="import_type">Import Type</label>
                            <select 
                                id="import_type" 
                                className="form-select text-white-dark"
                                value={importType}
                                onChange={(e) => setImportType(e.target.value)}
                            >
                                <option value="Insert New Records">Insert New Records</option>
                                <option value="Update Exiting Records">Update Exiting Records</option>
                            </select>
                        </div>

                        {dataPreview.length > 0 && (
                            <div className="sm:col-span-2 md:col-span-4">
                                <hr className="mb-6 mt-2 mx-[-1.25rem] border-gray-200 dark:border-gray-700" />
                                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                                <PreviewImport dataPreview={dataPreview}/>

                                {errorImport && Object.keys(errorImport.data.errors).length > 0 && (
                                    <div className="mt-4">
                                        <hr className="mb-6 mt-2 mx-[-1.25rem] border-gray-200 dark:border-gray-700" />
                                        <h3 className="text-lg font-semibold mb-4">Validation Errors</h3>
                                        <table className="border-collapse text-danger w-full mt-2">
                                            <thead>
                                                <tr className="!bg-danger/20 !border-danger/20">
                                                    <th>Row</th>
                                                    <th>Field</th>
                                                    <th>Error Message</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(errorImport.data.errors).map((rowIndex) =>
                                                    Object.keys(errorImport.data.errors[rowIndex]).map((field, fieldIndex) => (
                                                        <tr key={`${rowIndex}-${fieldIndex}`}>
                                                            <td className="p-2 text-center">
                                                                {parseInt(rowIndex) + 1}
                                                            </td>
                                                            <td>{field}</td>
                                                            <td>
                                                                {errorImport.data.errors[rowIndex][field].join(", ")}
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Import;
