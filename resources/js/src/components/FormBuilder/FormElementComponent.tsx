import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { FormElement, TableColumn } from './types';
import { renderFormElement } from './RenderFormElement';

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
            {/* Gunakan fungsi renderElement untuk merender elemen */}
            {renderFormElement({ element, onSelectTableColumn, handleUpdateTableColumn })}

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
