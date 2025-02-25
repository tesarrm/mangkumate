import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment, useState } from "react";
import exportPDF from "./exportPDF";
import exportCSV from "./exportCSV";
import exportExcel from "./exportExcel";
import { capitalizeFirstLetter } from "../../tools";

type Props = {
    modal: any,
    setModal: any,
    entity: any
    page: any,
    pageSize: any,
    search: any,
    sortStatus: any,
    useLazyGetExportDataQuery: any;
    selectedColumn: any,
    filterValue: any,
    columns: any,
    hideCols: any
    selectedRecords: any
};

const ExportModal: FC<Props> = ({
    modal,
    setModal,
    entity,
    page,
    pageSize,
    search,
    sortStatus,
    useLazyGetExportDataQuery,
    selectedColumn,
    filterValue,
    columns,
    hideCols,
    selectedRecords,
}) => {
    const [triggerExport] = useLazyGetExportDataQuery();
    const [selectedFileType, setSelectedFileType] = useState("PDF");
    const [selectedExportType, setSelectedExportType] = useState("All Records");
    const [orientation, setOrientation] = useState("portrait"); 

    const handleExport = async () => {
        const { data: dataExport } = await triggerExport({
            page, 
            pageSize,
            search,
            sort: sortStatus.columnAccessor,
            direction: sortStatus.direction,
            filterColumn: selectedColumn,  
            filterValue: filterValue    
        });

        const visibleCols = columns.filter(col => !hideCols.includes(col.accessor));

        let exportData = [];
        if (selectedExportType === "All Records") {
            exportData = dataExport;
        } else if (selectedExportType === "Selected Records") {
            exportData = selectedRecords;
        }

        if (selectedFileType === "PDF") {
            exportPDF(exportData, visibleCols, capitalizeFirstLetter(entity), orientation);
        } else if (selectedFileType === "CSV") {
            exportCSV(exportData, visibleCols, capitalizeFirstLetter(entity));
        } else if (selectedFileType === "Excel") {
            exportExcel(exportData, visibleCols, capitalizeFirstLetter(entity));
        }
    };

    return (
        <Transition appear show={modal} as={Fragment}>
            <Dialog as="div" open={modal} onClose={() => setModal(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0" />
                </Transition.Child>

                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-start justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel as="div" className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <div className="text-lg font-bold">Export Data</div>
                                    <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal(false)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-5 grid gap-4">
                                    <div>
                                        <label htmlFor="file_type">File Type</label>
                                        <select 
                                            id="file_type" 
                                            className="form-select text-white-dark" 
                                            value={selectedFileType}
                                            onChange={(e) => setSelectedFileType(e.target.value)}
                                        >
                                            <option value="PDF">PDF</option>
                                            <option value="CSV">CSV</option>
                                            <option value="Excel">Excel</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="export_type">Export Type</label>
                                        <select 
                                            id="export_type" 
                                            className="form-select text-white-dark"
                                            value={selectedExportType}
                                            onChange={(e) => setSelectedExportType(e.target.value)}
                                        >
                                            <option value="All Records">All Records</option>
                                            <option value="Selected Records">Selected Records</option>
                                            <option value="Blank Template">Blank Template</option>
                                        </select>
                                    </div>

                                    {selectedFileType === "PDF" && (
                                        <div>
                                            <label>Orientation</label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name="orientation"
                                                        value="portrait"
                                                        checked={orientation === "portrait"}
                                                        onChange={() => setOrientation("portrait")}
                                                        className="form-radio text-primary"
                                                    />
                                                    <span className="text-white-dark text-sm">Portrait</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name="orientation"
                                                        value="landscape"
                                                        checked={orientation === "landscape"}
                                                        onChange={() => setOrientation("landscape")}
                                                        className="form-radio text-primary"
                                                    />
                                                    <span className="text-white-dark text-sm">Landscape</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-8 flex items-center justify-end">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setModal(false)}>
                                            Discard
                                        </button>
                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleExport}>
                                            Export
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ExportModal;