import React from 'react';
import Select from 'react-select';
import { FormElement, TableColumn } from '../../FormBuilder/types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactSimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

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
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <input
                        id={element.name}
                        type="text"
                        name={element.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-input"
                        placeholder={element.placeholder || ''}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        case 'textarea':
            return (
                <div>
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <textarea
                        id={element.name}
                        name={element.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-textarea"
                        placeholder={element.placeholder || ''}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        case 'button':
            return (
                <div>
                    <button type="button" className="btn btn-primary">
                        {element.label || 'Button'}
                    </button>
                </div>
            );

        case 'checkbox':
            return (
                <div>
                    <label htmlFor={element.name}>
                        <input
                            id={element.name}
                            type="checkbox"
                            name={element.name}
                            checked={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            className="form-checkbox"
                        />
                        {element.label}
                    </label>
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        case 'date':
            return (
                <div>
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <input
                        id={element.name}
                        type="date"
                        name={element.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-input"
                        placeholder={element.placeholder || ''}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        case 'datetime':
            return (
                <div>
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <input
                        id={element.name}
                        type="datetime-local"
                        name={element.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-input"
                        placeholder={element.placeholder || ''}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        case 'integer':
        case 'float':
            return (
                <div>
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <input
                        id={element.name}
                        type="number"
                        name={element.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-input"
                        placeholder={element.placeholder || ''}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        case 'long-text':
            return (
                <div>
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <textarea
                        id={element.name}
                        name={element.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-textarea"
                        placeholder={element.placeholder || ''}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        case 'password':
            return (
                <div>
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <input
                        id={element.name}
                        type="password"
                        name={element.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-input"
                        placeholder={element.placeholder || ''}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        case 'small-text':
            return (
                <div>
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <input
                        id={element.name}
                        type="text"
                        name={element.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-input"
                        placeholder={element.placeholder || ''}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        // case 'select':
        //     return (
        //         <div>
        //             {/* <label htmlFor={element.name}>{element.label}</label> */}
        //             {element.label && (
        //                 <label htmlFor="ctnEmail">
        //                     {element.label}
        //                     {element.mandatory && <span className="text-danger">*</span>}
        //                 </label>
        //             )}
        //             <Select
        //                 id={element.name}
        //                 name={element.name}
        //                 options={element.options}
        //                 value={element.options?.find((option) => option?.value === value)}
        //                 onChange={(selectedOption) =>
        //                     onChange({
        //                         target: {
        //                             name: element.name,
        //                             value: selectedOption?.value || '',
        //                         },
        //                     })
        //                 }
        //                 onBlur={onBlur}
        //                 className="react-select"
        //                 placeholder={element.placeholder || ''}
        //             />
        //             {error && <span className="text-red-500">{error}</span>}
        //             {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
        //         </div>
        //     );

        case 'select':
            const selectOptions = element.options?.map((option) => ({
                value: option,
                label: option,
            })) || [];

            return (
                <div>
                    <label htmlFor={element.name}>{element.label}</label>
                    <Select
                        id={element.name}
                        name={element.name}
                        options={selectOptions}
                        value={selectOptions.find((option) => option.value === value)}
                        onChange={(selectedOption) =>
                            onChange({
                                target: {
                                    name: element.name,
                                    value: selectedOption?.value || '',
                                },
                            })
                        }
                        onBlur={onBlur}
                        className="react-select"
                    />
                    {error && <span className="text-red-500">{error}</span>}
                </div>
            );

        case 'time':
            return (
                <div>
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <input
                        id={element.name}
                        type="time"
                        name={element.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-input"
                        placeholder={element.placeholder || ''}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        case 'code':
            return (
                <div>
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <textarea
                        id={element.name}
                        name={element.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-textarea font-mono"
                        placeholder={element.placeholder || ''}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        case 'color':
            return (
                <div>
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <input
                        id={element.name}
                        type="color"
                        name={element.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-input"
                        placeholder={element.placeholder || ''}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        case 'image':
            return (
                <div>
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <input
                        id={element.name}
                        type="file"
                        name={element.name}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-input"
                        placeholder={element.placeholder || ''}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        // case 'markdown-editor':
        //     return (
        //         <div>
        //             {/* <label htmlFor={element.name}>{element.label}</label> */}
        //             {element.label && (
        //                 <label htmlFor="ctnEmail">
        //                     {element.label}
        //                     {element.mandatory && <span className="text-danger">*</span>}
        //                 </label>
        //             )}
        //             <textarea
        //                 id={element.name}
        //                 name={element.name}
        //                 value={value}
        //                 onChange={onChange}
        //                 onBlur={onBlur}
        //                 className="form-textarea"
        //                 placeholder={element.placeholder || ''}
        //             />
        //             {error && <span className="text-red-500">{error}</span>}
        //             {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
        //         </div>
        //     );

        case 'markdown-editor':
            return (
                <div>
                    {/* Label dengan penanda mandatory */}
                    {element.label && (
                        <label htmlFor={element.name}>
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}

                    {/* Markdown Editor */}
                    <ReactSimpleMDE
                        id={element.name}
                        value={value}
                        onChange={(content) =>
                            onChange({
                                target: {
                                    name: element.name,
                                    value: content,
                                },
                            })
                        }
                        // options={{
                        //     placeholder: element.placeholder || 'Enter markdown here...',
                        //     spellChecker: false, // Nonaktifkan spell checker
                        //     toolbar: [
                        //         'bold',
                        //         'italic',
                        //         'heading',
                        //         '|',
                        //         'quote',
                        //         'unordered-list',
                        //         'ordered-list',
                        //         '|',
                        //         'link',
                        //         'image',
                        //         '|',
                        //         'preview',
                        //         'guide',
                        //     ],
                        // }}
                    />

                    {/* Pesan error */}
                    {error && <span className="text-red-500">{error}</span>}

                    {/* Deskripsi */}
                    {element.description && (
                        <span className="ml-1 text-white-dark text-xs">
                            {element.description}
                        </span>
                    )}
                </div>
            );


        // case 'text-editor':
        //     return (
        //         <div>
        //             {/* <label htmlFor={element.name}>{element.label}</label> */}
        //             {element.label && (
        //                 <label htmlFor="ctnEmail">
        //                     {element.label}
        //                     {element.mandatory && <span className="text-danger">*</span>}
        //                 </label>
        //             )}
        //             <div
        //                 contentEditable
        //                 onBlur={(e) =>
        //                     onChange({
        //                         target: {
        //                             name: element.name,
        //                             value: e.currentTarget.textContent || '',
        //                         },
        //                     })
        //                 }
        //                 className="form-textarea"
        //             >
        //                 {value}
        //                 placeholder={element.placeholder || ''}
        //             </div>
        //             {error && <span className="text-red-500">{error}</span>}
        //             {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
        //         </div>
        //     );

        // case 'text-editor':
        //     return (
        //         <div>
        //             <label htmlFor={element.name}>{element.label}</label>
        //             <Editor
        //                 value={value}
        //                 onEditorChange={(content) =>
        //                     onChange({
        //                         target: {
        //                             name: element.name,
        //                             value: content,
        //                         },
        //                     })
        //                 }
        //                 init={{
        //                     height: 300,
        //                     menubar: false,
        //                     plugins: 'link image code',
        //                     toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | link image | code',
        //                 }}
        //             />
        //             {error && <span className="text-red-500">{error}</span>}
        //         </div>
        //     );

case 'text-editor':
    return (
        <div>
            {/* Label dengan penanda mandatory */}
            {element.label && (
                <label htmlFor={element.name}>
                    {element.label}
                    {element.mandatory && <span className="text-danger">*</span>}
                </label>
            )}

            {/* Quill Editor */}
            <ReactQuill
                theme="snow"
                value={value}
                onChange={(content) =>
                    onChange({
                        target: {
                            name: element.name,
                            value: content,
                        },
                    })
                }
                modules={{
                    toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header dropdown
                        ['bold', 'italic', 'underline', 'strike'], // Format teks
                        [{ list: 'ordered' }, { list: 'bullet' }], // Daftar
                        [{ script: 'sub' }, { script: 'super' }], // Subscript/Superscript
                        [{ indent: '-1' }, { indent: '+1' }], // Indentasi
                        [{ direction: 'rtl' }], // Arah teks
                        [{ color: [] }, { background: [] }], // Warna teks dan latar belakang
                        [{ font: [] }], // Font family
                        [{ align: [] }], // Alignment
                        ['link', 'image', 'video'], // Link, gambar, dan video
                        ['clean'], // Hapus formatting
                    ],
                }}
                formats={[
                    'header',
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'list',
                    'bullet',
                    'indent',
                    'script',
                    'direction',
                    'color',
                    'background',
                    'font',
                    'align',
                    'link',
                    'image',
                    'video',
                    'clean',
                ]}
                placeholder={element.placeholder || 'Enter text here...'}
                // className="form-textarea"
            />

            {/* Pesan error */}
            {error && <span className="text-red-500">{error}</span>}

            {/* Deskripsi */}
            {element.description && (
                <span className="ml-1 text-white-dark text-xs">
                    {element.description}
                </span>
            )}
        </div>
    );

        case 'link':
            return (
                <div>
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <input
                        id={element.name}
                        type="url"
                        name={element.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-input"
                        placeholder={element.placeholder || ''}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        // case 'multiple-select':
        // case 'multiple-select-link':
        //     return (
        //         <div>
        //             {/* <label htmlFor={element.name}>{element.label}</label> */}
        //             {element.label && (
        //                 <label htmlFor="ctnEmail">
        //                     {element.label}
        //                     {element.mandatory && <span className="text-danger">*</span>}
        //                 </label>
        //             )}
        //             <Select
        //                 id={element.name}
        //                 name={element.name}
        //                 options={element.options}
        //                 value={element.options?.filter((option) => value?.includes(option.value))}
        //                 onChange={(selectedOptions) =>
        //                     onChange({
        //                         target: {
        //                             name: element.name,
        //                             value: selectedOptions?.map((option) => option.value) || [],
        //                         },
        //                     })
        //                 }
        //                 isMulti
        //                 className="react-select"
        //                 placeholder={element.placeholder || ''}
        //             />
        //             {error && <span className="text-red-500">{error}</span>}
        //             {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
        //         </div>
        //     );

        case 'multiple-select':
        case 'multiple-select-link':
            const multiSelectOptions = element.options?.map((option) => ({
                value: option,
                label: option,
            })) || [];

            return (
                <div>
                    <label htmlFor={element.name}>{element.label}</label>
                    <Select
                        id={element.name}
                        name={element.name}
                        options={multiSelectOptions}
                        value={multiSelectOptions.filter((option) => value?.includes(option.value))}
                        onChange={(selectedOptions) =>
                            onChange({
                                target: {
                                    name: element.name,
                                    value: selectedOptions?.map((option) => option.value) || [],
                                },
                            })
                        }
                        isMulti
                        className="react-select"
                    />
                    {error && <span className="text-red-500">{error}</span>}
                </div>
            );

        case 'table':
            return (
                <div>
                    {/* <label htmlFor={element.name}>{element.label}</label> */}
                    {element.label && (
                        <label htmlFor="ctnEmail">
                            {element.label}
                            {element.mandatory && <span className="text-danger">*</span>}
                        </label>
                    )}
                    <table className="table-auto">
                        <thead>
                            <tr>
                                {element.tableColumns?.map((column) => (
                                    <th key={column.id}>{column.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {element.tableColumns?.map((column) => (
                                    <td key={column.id}>
                                        <input
                                            type="text"
                                            name={`${element.name}.${column.name}`}
                                            value={value[column.name] || ''}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className="form-input"
                                        />
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                        placeholder={element.placeholder || ''}
                    </table>
                    {error && <span className="text-red-500">{error}</span>}
                    {element.description && <span className="ml-1 text-white-dark text-xs">{element.description}</span>}
                </div>
            );

        default:
            return null;
    }
};