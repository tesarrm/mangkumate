import React, { useState, useRef } from "react";

const PreviewImport = ({ dataPreview }) => {
    const [columnWidths, setColumnWidths] = useState(
        Object.keys(dataPreview[0] || {}).reduce((acc, key) => {
            acc[key] = 150; // Default lebar awal 150px
            return acc;
        }, {})
    );
    const resizingColumn = useRef(null);

    const handleMouseDown = (event, columnKey) => {
        resizingColumn.current = { columnKey, startX: event.clientX, startWidth: columnWidths[columnKey] };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event) => {
        if (!resizingColumn.current) return;
        const { columnKey, startX, startWidth } = resizingColumn.current;
        const newWidth = Math.max(50, startWidth + (event.clientX - startX)); // Minimum width 50px
        setColumnWidths((prev) => ({ ...prev, [columnKey]: newWidth }));
    };

    const handleMouseUp = () => {
        resizingColumn.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    return (
        <div className="overflow-x-auto mb-5">
            <table className="border-collapse w-full table-fixed">
                <thead>
                    <tr>
                        {Object.keys(dataPreview[0]).map((key) => (
                            <th
                                key={key}
                                className="relative border border-gray-200 px-4 py-2 truncate"
                                style={{ width: columnWidths[key] }}
                            >
                                <div className="flex justify-between items-center font-bold">
                                    {key}
                                    <span
                                        className="w-1 h-ful cursor-col-resize absolute right-[-2px] top-0 bottom-0"
                                        onMouseDown={(e) => handleMouseDown(e, key)}
                                    />
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {dataPreview.map((row, index) => (
                        <tr key={index} className="border border-gray-200">
                            {Object.keys(row).map((key, i) => (
                                <td key={i} className="px-4 py-2 truncate" style={{ width: columnWidths[key] }}>
                                    {row[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PreviewImport;
