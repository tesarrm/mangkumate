import React, { useState, useRef } from 'react';
import { Column, FormElement, Section } from './types';
import IconPlus from '../Icon/IconPlus';
import { useDrag, useDrop } from 'react-dnd';
import { ColumnComponent } from './ColumnComponent';


interface FormAreaProps {
    section: Section;
    sections: Section[];
    elements: FormElement[];
    onDrop: (item: any, columnId: string, targetOrder?: number) => void;
    addColumn: () => void;
    deleteColumn: (columnId: string) => void;
    deleteSection: (sectionId: string) => void;
    deleteElement: (elementId: string) => void;
    duplicateElement: (elementId: string) => void;
    moveColumn: (columnId: string, newSectionId: string) => void;
    moveSection: (sectionId: string, newIndex: number) => void;
    sectionIndex: number;
    onSelectSection: (section: Section) => void;
    onSelectColumn: (column: Column) => void;
    onSelectElement: (element: FormElement) => void;
    onAddElement: (columnId: string, type: string, sectionId: string) => void; // Fungsi untuk menambah elemen baru
    addSection: any;
    onSelectTableColumn: (elementId: string, columnIndex: number) => void; // Handler untuk memilih kolom tabel
    handleUpdateTableColumn: any;
}

export const FormArea: React.FC<FormAreaProps> = ({
    section,
    sections,
    elements,
    onDrop,
    addColumn,
    deleteColumn,
    deleteSection,
    deleteElement,
    duplicateElement,
    moveColumn,
    moveSection,
    sectionIndex,
    onSelectSection,
    onSelectColumn,
    onSelectElement,
    onAddElement,
    addSection,
    onSelectTableColumn,
    handleUpdateTableColumn,
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Drag and drop untuk section
    const [, dragSection] = useDrag({
        type: 'section',
        item: { sectionId: section.id },
    });

    const [, dropSection] = useDrop({
        accept: 'section',
        hover: (item: { sectionId: string }, monitor) => {
            if (!sectionRef.current) return;

            const dragIndex = sections.findIndex((sec) => sec.id === item.sectionId);
            const hoverIndex = sectionIndex;

            if (dragIndex === hoverIndex) return;

            moveSection(item.sectionId, hoverIndex);
        },
    });

    dragSection(dropSection(sectionRef));

    return (
        <div
            ref={sectionRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
                e.stopPropagation(); // Hentikan event bubbling
                onSelectSection(section);
            }}
            className={`p-5 ${sectionIndex !== 0 && 'pt-4 border-t'}`}
        >
            {/* Tombol hapus dan duplikat section */}
            {isHovered && (
                <div
                    className="absolute right-5 flex gap-1"
                >
                    <button onClick={() => deleteSection(section.id)}>
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
                    <button onClick={addSection}>
                        <IconPlus />
                    </button>
                </div>
            )}

            {/* label */}
            <h3 className="italic">{section.label ? section.label : 'No Label'}</h3>
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                {section.columns.map((column) => (
                    <ColumnComponent
                        key={column.id}
                        column={column}
                        section={section}
                        elements={elements.filter((el) => el.columnId === column.id).sort((a, b) => a.order - b.order)}
                        onDrop={(item, targetOrder) => onDrop(item, column.id, targetOrder)}
                        deleteColumn={deleteColumn}
                        deleteElement={deleteElement}
                        duplicateElement={duplicateElement}
                        moveColumn={moveColumn}
                        onSelectColumn={onSelectColumn} // Teruskan fungsi untuk memilih column
                        onSelectElement={onSelectElement} // Teruskan fungsi untuk memilih elemen
                        onAddElement={onAddElement}
                        sectionId={section.id}
                        addColumn={addColumn}
                        onSelectTableColumn={onSelectTableColumn}
                        handleUpdateTableColumn={handleUpdateTableColumn}
                    />
                ))}
            </div>
        </div>
    );
};