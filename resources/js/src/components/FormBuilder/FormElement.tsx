import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { FormElement, TableColumn } from './types';

interface FormElementProps {
    element: FormElement;
    deleteElement: (elementId: string) => void;
    duplicateElement: (elementId: string) => void;
    onSelectElement: (element: FormElement) => void;
    onSelectTableColumn: (elementId: string, columnIndex: number) => void; // Handler untuk memilih kolom tabel
    handleUpdateTableColumn: any;
}

export const FormElementComponent: React.FC<FormElementProps> = ({ 
    element, 
    deleteElement, 
    duplicateElement, 
    onSelectElement, 
    onSelectTableColumn, 
    handleUpdateTableColumn,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [, drag] = useDrag({
        type: 'form-element',
        item: { elementId: element.id },
    });

    let inputElement;
    switch (element.type) {
        case 'input':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <input
                        className={`form-input ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`}
                        placeholder={element.placeholder || 'Input Field'}
                        readOnly
                    />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'textarea':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <textarea
                        className={`form-input ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`}
                        placeholder={element.placeholder || 'Text Area'}
                        readOnly
                    />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'button':
            inputElement = <button className="btn btn-primary">{element.label || 'Button'}</button>;
            break;

        case 'checkbox':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <input type="checkbox" className={`form-checkbox ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`} readOnly />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'date':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <input type="date" className={`form-input ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`} readOnly />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'datetime':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <input type="datetime-local" className={`form-input ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`} readOnly />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'integer':
        case 'float':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <input
                        type="number"
                        className={`form-input ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`}
                        placeholder={element.placeholder || 'Enter a number'}
                        readOnly
                    />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'long-text':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <textarea
                        className={`form-input ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`}
                        placeholder={element.placeholder || 'Long Text'}
                        readOnly
                    />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'password':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <input
                        type="password"
                        className={`form-input ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`}
                        placeholder={element.placeholder || 'Password'}
                        readOnly
                    />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'small-text':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <input
                        type="text"
                        className={`form-input ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`}
                        placeholder={element.placeholder || 'Small Text'}
                        readOnly
                    />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'select':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <select className={`form-select ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`} readOnly>
                        {element.options?.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'time':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <input type="time" className={`form-input ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`} readOnly />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'code':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <textarea
                        className={`form-input font-mono ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`}
                        placeholder={element.placeholder || 'Enter code'}
                        readOnly
                    />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'color':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <input type="color" className={`form-input ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`} readOnly />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'image':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <div className={`border-2 border-dashed p-4 ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`}>
                        <p className="text-center">Drag and drop an image here</p>
                    </div>
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'markdown-editor':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <textarea
                        className={`form-input ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`}
                        placeholder={element.placeholder || 'Enter markdown'}
                        readOnly
                    />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'text-editor':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <div
                        className={`border p-2 ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`}
                        contentEditable={!element.readOnly}
                        suppressContentEditableWarning
                    >
                        {element.placeholder || 'Enter text'}
                    </div>
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'link':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <input
                        className={`form-input ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`}
                        placeholder={element.placeholder || 'Input Field'}
                        readOnly
                    />
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'multiple-select':
        case 'multiple-select-link':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}
                    <select multiple className={`form-select ${element.readOnly && 'pointer-events-none bg-[#eee] dark:bg-[#1b2e4b] cursor-not-allowed'}`} readOnly>
                        {element.options?.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        case 'table':
            inputElement = (
                <div>
                    {element.label ? (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    ) : (
                        <label htmlFor="ctnEmail" className="italic">
                            No Label
                        </label>
                    )}

                    <div className="table-responsive whitespace-nowrap">
                        <table>
                            <thead>
                                <tr>
                                    {element.tableColumns?.map((header, index) => (
                                        <th
                                            key={header.id}
                                            className="border px-4 py-2 cursor-pointer group relative bg-white"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSelectTableColumn(element.id, index);
                                            }}
                                        >
                                            {header.label}

                                            <div className="absolute right-1 space-x-1 top-5 flex opacity-0 group-hover:opacity-100 transition-opacity">
                                                {/* Delete Column Icon */}
                                                <button
                                                    className="p-0.5 hover:bg-gray-200 rounded"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Konfirmasi sebelum menghapus kolom
                                                        const isConfirmed = window.confirm("Are you sure you want to delete this column?");
                                                        if (isConfirmed) {
                                                            const newColumns = element.tableColumns?.filter((_, i) => i !== index) || [];
                                                            handleUpdateTableColumn({
                                                                ...element,
                                                                tableColumns: newColumns,
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>

                                                {/* Add Right Column Icon */}
                                                <button
                                                    className="p-0.5 hover:bg-gray-200 rounded"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newColumn: TableColumn = {
                                                            id: `column-${Date.now()}`,
                                                            label: `Column ${(element.tableColumns?.length || 0) + 1}`,
                                                            name: `column_${(element.tableColumns?.length || 0) + 1}`,
                                                            type: 'text',
                                                            mandatory: false,
                                                        };
                                                        const newColumns = [
                                                            ...(element.tableColumns?.slice(0, index + 1) || []),
                                                            newColumn,
                                                            ...(element.tableColumns?.slice(index + 1) || []),
                                                        ];
                                                        handleUpdateTableColumn({
                                                            ...element,
                                                            tableColumns: newColumns,
                                                        });
                                                    }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </th>
                                    ))}

                                    {/* Tombol untuk menambahkan kolom baru di akhir */}
                                    {/* <th className="border px-4 py-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const newColumn: TableColumn = {
                                                    id: `column-${Date.now()}`,
                                                    label: `Column ${(element.tableColumns?.length || 0) + 1}`,
                                                    name: `column_${(element.tableColumns?.length || 0) + 1}`,
                                                    type: 'text',
                                                    mandatory: false,
                                                };
                                                const newColumns = [...(element.tableColumns || []), newColumn];
                                                handleUpdateTableColumn({
                                                    ...element,
                                                    tableColumns: newColumns,
                                                });
                                            }}
                                        >
                                            <div className="mr-8">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11 19L17 12L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </button>
                                    </th> */}
                                </tr>
                            </thead>
                            {/* <tbody>
                                {element.tableData?.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex} className="border px-4 py-2">
                                                {cell}
                                            </td>
                                        ))}
                                        <td className="border px-4 py-2"></td>
                                    </tr>
                                ))}
                            </tbody> */}
                        </table>
                    </div>

                    <div className="h-20 bg-white grid place-content-center border rounded-b-md">
                        <span>Child Table</span>
                    </div>

                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );
            break;

        default:
            inputElement = null;
    }

    return (
        <div
            ref={drag}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
                e.stopPropagation(); // Hentikan event bubbling
                onSelectElement(element);
            }}
        >
            {inputElement}

            {/* icon action */}
            {isHovered && (
                <div className="absolute top-8 right-2 flex gap-1">
                    <button onClick={() => deleteElement(element.id)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
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
                    <button onClick={() => duplicateElement(element.id)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <path
                                opacity="0.5"
                                d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};
