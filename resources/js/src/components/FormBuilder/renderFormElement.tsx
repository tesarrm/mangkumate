import React from 'react';
import { FormElement, TableColumn } from './types';

interface RenderElementProps {
    element: FormElement;
    onSelectTableColumn: (elementId: string, columnIndex: number) => void;
    handleUpdateTableColumn: (updatedElement: FormElement) => void;
}

export const renderFormElement = ({ element, onSelectTableColumn, handleUpdateTableColumn }: RenderElementProps) => {
    switch (element.type) {
        case 'input':
            return (
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
            return (
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
            return <button className="btn btn-primary">{element.label || 'Button'}</button>;
            break;

        case 'checkbox':
            return (
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
            return (
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
            return (
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
            return (
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
            return (
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
            return (
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
            return (
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
            return (
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
            return (
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
            return (
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
            return (
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
            return (
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
            return (
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
            return (
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
            return (
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
            return (
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
            return (
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
                                </tr>
                            </thead>
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
            return null;
    }
}