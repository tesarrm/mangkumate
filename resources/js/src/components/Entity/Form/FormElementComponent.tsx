import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { FormElement, TableColumn } from '../../FormBuilder/types';
import { renderFormElement } from '../../FormBuilder/RenderFormElement';

interface FormElementProps {
    element: FormElement;
    value: any;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
    error?: string;
}

export const FormElementComponent: React.FC<FormElementProps> = ({ element, value, onChange, onBlur, error }) => {
    switch (element.type) {
        case 'input':
            return (
                <div>
                    <label htmlFor={element.name}>{element.label}</label>
                    <input
                        id={element.name}
                        type="text"
                        name={element.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-input"
                    />
                    {error && <span className="text-red-500">{error}</span>}
                </div>
            );
        // Tambahkan case untuk tipe elemen lainnya
        default:
            return null;
    }
};