import React, { useState, useRef } from 'react';
import { Column, FormElement, Section } from "./types";
import { useDrag, useDrop } from 'react-dnd';
import IconPlus from '../Icon/IconPlus';
import { FormElementComponent } from './FormElementComponent';
import Select from 'react-select';

const options = [
    { value: 'input', label: 'Input' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'button', label: 'Button' },

    { value: 'checkbox', label: 'Checkbox' },
    { value: 'date', label: 'Date' },
    { value: 'datetime', label: 'Datetime' },
    { value: 'integer', label: 'Int' },
    { value: 'float', label: 'Float' },
    { value: 'long-text', label: 'Long Text' }, // belum
    { value: 'password', label: 'Password' },
    { value: 'small-text', label: 'Small Text' }, // belum
    { value: 'select', label: 'Select' },
    { value: 'time', label: 'Time' },

    { value: 'code', label: 'Code' },
    { value: 'color', label: 'Color' },
    { value: 'image', label: 'Image' },
    { value: 'markdown-editor', label: 'Markdown Editor' },
    { value: 'text-editor', label: 'Text Editor' },

    { value: 'link', label: 'Link' },
    { value: 'multiple-select', label: 'Multiple Select' },
    { value: 'multiple-select-link', label: 'Multiple Select Link' },
    { value: 'table', label: 'Table' },
];

interface ColumnComponentProps {
    column: Column;
    section: Section;
    elements: FormElement[];
    onDrop: (item: any, targetOrder?: number) => void;
    deleteColumn: (columnId: string) => void;
    deleteElement: (elementId: string) => void;
    duplicateElement: (elementId: string) => void;
    onSelectElement: (element: FormElement) => void;
    moveColumn: (columnId: string, newSectionId: string) => void;
    onSelectColumn: (column: Column) => void;
    onAddElement: (columnId: string, type: string, sectionId: string) => void; // Fungsi untuk menambah elemen baru
    sectionId: any;
    addColumn: any;
    onSelectTableColumn: (elementId: string, columnIndex: number) => void; // Handler untuk memilih kolom tabel
    handleUpdateTableColumn: any;
}

export const ColumnComponent: React.FC<ColumnComponentProps> = ({
    column,
    section,
    elements,
    onDrop,
    deleteColumn,
    deleteElement,
    duplicateElement,
    onSelectElement,
    moveColumn,
    onSelectColumn,
    onAddElement,
    sectionId,
    addColumn,
    onSelectTableColumn,
    handleUpdateTableColumn,
}) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const columnRef = useRef<HTMLDivElement>(null);

    // Drag and drop untuk column
    const [, dragColumn] = useDrag({
        type: 'column',
        item: { columnId: column.id },
    });

    const [, dropColumn] = useDrop({
        accept: 'column',
        hover: (item: { columnId: string }, monitor) => {
            if (!columnRef.current) return;

            const dragIndex = section.columns.findIndex((col) => col.id === item.columnId);
            const hoverIndex = section.columns.findIndex((col) => col.id === column.id);

            if (dragIndex === hoverIndex) return;

            moveColumn(item.columnId, section.id);
        },
    });

    const [, drop] = useDrop({
        accept: 'form-element',
        drop: (item, monitor) => {
            if (columnRef.current) {
                const offset = monitor.getClientOffset();
                const rect = columnRef.current.getBoundingClientRect(); // Posisi column
                const hoverIndex = Math.floor((offset!.y - rect.top) / 50); // 50 adalah tinggi elemen
                onDrop(item, hoverIndex);
                setHoverIndex(null); // Reset hover index setelah drop
            }
        },
        hover: (item, monitor) => {
            if (columnRef.current) {
                const offset = monitor.getClientOffset();
                const rect = columnRef.current.getBoundingClientRect(); // Posisi column
                const hoverIndex = Math.floor((offset!.y - rect.top) / 50); // Hitung posisi hover
                setHoverIndex(hoverIndex);
            }
        },
    });

    // Attach ref ke elemen column
    drop(columnRef);

    dragColumn(dropColumn(columnRef));

    const [showAddElementDropdown, setShowAddElementDropdown] = useState(false);

    // Handler untuk menambah elemen baru
    const handleAddElement = (type: any) => {
        onAddElement(column.id, type.value, sectionId);
        setShowAddElementDropdown(false); // Sembunyikan dropdown setelah menambah elemen
        setShowDropdown(false); // Sembunyikan dropdown setelah memilih
    };
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div
            ref={columnRef}
            style={{ flex: 1, border: '1px dashed #ccc', padding: '16px', position: 'relative' }}
            className="bg-[#f4f4f4] dark:bg-white-dark/20 p-3 pb-5 rounded-md mb-5 cursor-move overflow-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
                e.stopPropagation(); // Hentikan event bubbling
                onSelectColumn(column);
            }}
        >
            {/* Tombol hapus column */}
            {isHovered && (
                <div
                    className="absolute top-2 right-2 flex gap-1"
                >
                    <button onClick={() => deleteColumn(column.id)}>
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
                    <button onClick={addColumn}>
                        <IconPlus />
                    </button>
                </div>
            )}

            {column.label && <h4>{column.label}</h4>}
            {/* <h4>Column: {column.label}</h4> */}

            <div className="space-y-4">
                {elements.map((element, index) => (
                    <React.Fragment key={element.id}>
                        <FormElementComponent
                            element={element}
                            deleteElement={deleteElement}
                            duplicateElement={duplicateElement}
                            onSelectElement={onSelectElement}
                            onSelectTableColumn={onSelectTableColumn}
                            handleUpdateTableColumn={handleUpdateTableColumn}
                        />
                    </React.Fragment>
                ))}

                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="btn btn-sm bg-white shadow-none"
                    >
                        Add Element
                    </button>

                    {showDropdown && (
                        <div className="absolute left-0 w-[200px] bg-white border shadow-lg z-50 mt-[-2rem]">
                            <Select
                                options={options}
                                placeholder="Select an option"
                                onChange={handleAddElement}
                                menuIsOpen // Langsung membuka dropdown
                                components={{ DropdownIndicator: () => null }} // Hilangkan dropdown indicator
                                classNames={{
                                    control: () => "relative",
                                }}
                                menuPortalTarget={document.body} // **Menjadikan dropdown melayang**
                                styles={{
                                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};