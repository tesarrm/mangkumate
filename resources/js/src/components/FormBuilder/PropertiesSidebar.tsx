import React, { useState, useEffect } from 'react';
import { FormElement, TableColumn, Section, Column } from './types';

interface PropertiesSidebarProps {
    type: 'section' | 'column' | 'element' | 'table-column';
    data: Section | Column | FormElement | TableColumn; // Data yang diterima (section, column, element, atau table-column)
    onUpdate: (updatedProperties: Partial<Section> | Partial<Column> | Partial<FormElement> | Partial<TableColumn>) => void;
}

export const PropertiesSidebar: React.FC<PropertiesSidebarProps> = ({ type, data, onUpdate }) => {
    // State untuk semua properti
    const [label, setLabel] = useState(data.label || '');
    const [name, setName] = useState(data.name || '');
    const [description, setDescription] = useState(data.description || '');
    const [typeElement, setTypeElement] = useState(type === 'element' || type === 'table-column' ? (data as FormElement | TableColumn).type || '' : '');
    const [length, setLength] = useState(type === 'element' || type === 'table-column' ? (data as FormElement | TableColumn).length || 0 : 0);
    const [mandatory, setMandatory] = useState(type === 'element' || type === 'table-column' ? (data as FormElement | TableColumn).mandatory || false : false);
    const [notNullable, setNotNullable] = useState(type === 'element' || type === 'table-column' ? (data as FormElement | TableColumn).notNullable || false : false);
    const [options, setOptions] = useState(type === 'element' || type === 'table-column' ? (data as FormElement | TableColumn).options || [] : []);
    const [defaultValue, setDefaultValue] = useState(type === 'element' || type === 'table-column' ? (data as FormElement | TableColumn).defaultValue || '' : '');
    const [hidden, setHidden] = useState(type === 'element' || type === 'table-column' ? (data as FormElement | TableColumn).hidden || false : false);
    const [readOnly, setReadOnly] = useState(type === 'element' || type === 'table-column' ? (data as FormElement | TableColumn).readOnly || false : false);
    const [unique, setUnique] = useState(type === 'element' || type === 'table-column' ? (data as FormElement | TableColumn).unique || false : false);
    const [placeholder, setPlaceholder] = useState(type === 'element' || type === 'table-column' ? (data as FormElement | TableColumn).placeholder || '' : '');

    // Perbarui state lokal saat data berubah
    useEffect(() => {
        setLabel(data.label || '');
        setName(data.name || '');
        setDescription(data.description || '');

        if (type === 'element' || type === 'table-column') {
            const elementData = data as FormElement | TableColumn;
            setTypeElement(elementData.type || '');
            setLength(elementData.length || 0);
            setMandatory(elementData.mandatory || false);
            setNotNullable(elementData.notNullable || false);
            setOptions(elementData.options || []);
            setDefaultValue(elementData.defaultValue || '');
            setHidden(elementData.hidden || false);
            setReadOnly(elementData.readOnly || false);
            setUnique(elementData.unique || false);
            setPlaceholder(elementData.placeholder || '');
        }
    }, [data, type]);

    // Handler untuk memperbarui properti
    const handleUpdate = () => {
        if (type === 'section') {
            onUpdate({ label, name, description });
        } else if (type === 'column') {
            onUpdate({ label, name, description });
        } else if (type === 'element' || type === 'table-column') {
            onUpdate({
                label,
                name,
                description,
                type: typeElement,
                length,
                mandatory,
                notNullable,
                options,
                defaultValue,
                hidden,
                readOnly,
                unique,
                placeholder,
            });
        }
    };

    return (
        // <div className="panel p-4 ml-4 flex-none w-[280px] absolute xl:relative z-10 space-y-4 h-auto">
        <div className="panel p-4 ml-4 flex-none w-[280px] relative z-10 space-y-4 h-auto">
            <h3>{type === 'section' ? 'Section Properties' : type === 'column' ? 'Column Properties' : type === 'element' ? 'Element Properties' : 'Table Column Properties'}</h3>

            {/* Label */}
            <div>
                <label>Label</label>
                <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} onBlur={handleUpdate} className="form-input" />
            </div>

            {/* Name (Variable/ID) */}
            <div>
                <label>Name (Variable/ID)</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={handleUpdate} className="form-input" />
            </div>

            {/* Description */}
            <div>
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} onBlur={handleUpdate} className="form-textarea" />
            </div>

            {/* Properti khusus untuk form element dan table column */}
            {(type === 'element' || type === 'table-column') && (
                <>
                    {/* Type */}
                    {/* <div>
                        <label>Type</label>
                        <select value={typeElement} onChange={(e) => setTypeElement(e.target.value)} onBlur={handleUpdate} className="form-select">
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                            <option value="input">Input</option>
                        </select>
                    </div> */}

                    <div>
                        <select
                            value={typeElement}
                            onChange={(e) => setTypeElement(e.target.value)}
                            onBlur={handleUpdate}
                            className="form-select"
                        >
                            <option value="input">Input</option>
                            <option value="textarea">Textarea</option>
                            <option value="button">Button</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="date">Date</option>
                            <option value="datetime">Datetime</option>
                            <option value="integer">Int</option>
                            <option value="float">Float</option>
                            <option value="long-text">Long Text</option>
                            <option value="password">Password</option>
                            <option value="small-text">Small Text</option>
                            <option value="select">Select</option>
                            <option value="time">Time</option>
                            <option value="code">Code</option>
                            <option value="color">Color</option>
                            <option value="image">Image</option>
                            <option value="markdown-editor">Markdown Editor</option>
                            <option value="text-editor">Text Editor</option>
                            <option value="link">Link</option>
                            <option value="multiple-select">Multiple Select</option>
                            <option value="multiple-select-link">Multiple Select Link</option>
                            <option value="table">Table</option>
                        </select>
                    </div> 

                    {/* Length */}
                    <div>
                        <label>Length</label>
                        <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} onBlur={handleUpdate} className="form-input" />
                    </div>

                    {/* Mandatory */}
                    <div>
                        <label>
                            <input type="checkbox" checked={mandatory} onChange={(e) => setMandatory(e.target.checked)} onBlur={handleUpdate} className="form-checkbox" />
                            Mandatory
                        </label>
                    </div>

                    {/* Not Nullable */}
                    <div>
                        <label>
                            <input type="checkbox" checked={notNullable} onChange={(e) => setNotNullable(e.target.checked)} onBlur={handleUpdate} className="form-checkbox" />
                            Not Nullable
                        </label>
                    </div>

                    {/* Options (for Select) */}
                    {(typeElement === 'select' || typeElement === 'multiple-select' || typeElement === 'multiple-select-link') && (
                        <div>
                            <label>Options</label>
                            <textarea
                                value={options.join('\n')}
                                onChange={(e) => setOptions(e.target.value.split('\n'))}
                                onBlur={handleUpdate}
                                className="form-textarea"
                                placeholder="Enter options, one per line"
                            />
                        </div>
                    )}

                    {/* Default Value */}
                    <div>
                        <label>Default Value</label>
                        <input type="text" value={defaultValue} onChange={(e) => setDefaultValue(e.target.value)} onBlur={handleUpdate} className="form-input" />
                    </div>

                    {/* Hidden */}
                    <div>
                        <label>
                            <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} onBlur={handleUpdate} className="form-checkbox" />
                            Hidden
                        </label>
                    </div>

                    {/* Read Only */}
                    <div>
                        <label>
                            <input type="checkbox" checked={readOnly} onChange={(e) => setReadOnly(e.target.checked)} onBlur={handleUpdate} className="form-checkbox" />
                            Read Only
                        </label>
                    </div>

                    {/* Unique */}
                    <div>
                        <label>
                            <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} onBlur={handleUpdate} className="form-checkbox" />
                            Unique
                        </label>
                    </div>

                    {/* Placeholder */}
                    <div>
                        <label>Placeholder</label>
                        <input type="text" value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} onBlur={handleUpdate} className="form-input" />
                    </div>
                </>
            )}
        </div>
    );
};
