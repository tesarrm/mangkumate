// import { useState } from 'react';
// import { FormElement, Section, Column, TableColumn } from './types';

// export const useFormBuilder = () => {
//     const [elements, setElements] = useState<FormElement[]>([]);
//     const [sections, setSections] = useState<Section[]>([
//         {
//             id: 'section-1',
//             name: 'section_1',
//             description: 'This is section 1',
//             columns: [
//                 {
//                     id: 'column-1',
//                     name: 'column_1',
//                     description: 'This is column 1',
//                     sectionId: 'section-1',
//                 },
//             ],
//         },
//     ]);

import { useState, useEffect } from 'react';
import { FormElement, Section, Column, TableColumn } from './types';

export const useFormBuilder = (initialData?: {formName: any, sections: Section[]; elements: FormElement[] }) => {
    const [formName, setFormName] = useState(initialData?.formName || "")
    const [elements, setElements] = useState<FormElement[]>(initialData?.elements || []);
    const [sections, setSections] = useState<Section[]>(initialData?.sections || [
        {
            id: 'section-1',
            name: 'section_1',
            description: 'This is section 1',
            columns: [
                {
                    id: 'column-1',
                    name: 'column_1',
                    description: 'This is column 1',
                    sectionId: 'section-1',
                },
            ],
        },
    ]);

    useEffect(() => {
        if (initialData) {
            setSections(initialData.sections);
            setElements(initialData.elements);
            setFormName(initialData.formName);
        }
    }, [JSON.stringify(initialData)]); // Gunakan JSON.stringify untuk membandingkan nilai, bukan referensi

    // console.log(sections)
    console.log(elements)

    const [selectedElement, setSelectedElement] = useState<FormElement | null>(null);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);
    const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
    const [selectedTableColumn, setSelectedTableColumn] = useState<{ elementId: string; columnIndex: number } | null>(null);

    // Fungsi untuk memindahkan elemen
    const moveElement = (elementId: string, newSectionId: string, newColumnId: string, newOrder: number) => {
        setElements((prevElements) =>
            prevElements.map((element) =>
                element.id === elementId ? { ...element, sectionId: newSectionId, columnId: newColumnId, order: newOrder } : element
            )
        );
    };

    // Fungsi untuk menangani drop elemen
    const handleDrop = (item: any, sectionId: string, columnId: string, targetOrder?: number) => {
        if (item.elementId) {
            const newOrder = targetOrder !== undefined ? targetOrder : elements.length;
            moveElement(item.elementId, sectionId, columnId, newOrder);
        } else {
            setElements([
                ...elements,
                {
                    id: `${item.type}-${Date.now()}`,
                    type: item.type,
                    sectionId,
                    columnId,
                    order: elements.length,
                },
            ]);
        }
    };

    // Fungsi untuk menambahkan kolom
    const addColumn = (sectionId: string) => {
        setSections((prevSections) =>
            prevSections.map((section) =>
                section.id === sectionId
                    ? {
                          ...section,
                          columns: [...section.columns, { id: `column-${Date.now()}`, sectionId }],
                      }
                    : section
            )
        );
    };

    // Fungsi untuk menambahkan section
    const addSection = () => {
        const newSectionId = `section-${Date.now()}`;
        setSections((prevSections) => [
            ...prevSections,
            {
                id: newSectionId,
                columns: [{ id: `column-${Date.now()}`, sectionId: newSectionId }],
            },
        ]);
    };

    // Fungsi untuk menghapus elemen, kolom, atau section
    const deleteElement = (elementId: string) => {
        if (window.confirm('Are you sure you want to delete this form element?')) {
            setElements((prevElements) => prevElements.filter((element) => element.id !== elementId));
        }
    };

    const deleteColumn = (columnId: string) => {
        if (window.confirm('Are you sure you want to delete this column and all its form elements?')) {
            setSections((prevSections) =>
                prevSections.map((section) => ({
                    ...section,
                    columns: section.columns.filter((col) => col.id !== columnId),
                }))
            );
            setElements((prevElements) => prevElements.filter((element) => element.columnId !== columnId));
        }
    };

    const deleteSection = (sectionId: string) => {
        if (window.confirm('Are you sure you want to delete this section and all its columns and form elements?')) {
            setSections((prevSections) => prevSections.filter((section) => section.id !== sectionId));
            setElements((prevElements) => prevElements.filter((element) => element.sectionId !== sectionId));
        }
    };

    // Fungsi untuk memperbarui properti
    const updateSectionProperties = (updatedProperties: Partial<Section>) => {
        if (selectedSection) {
            const updatedSection = { ...selectedSection, ...updatedProperties };
            setSections((prevSections) => prevSections.map((sec) => (sec.id === updatedSection.id ? updatedSection : sec)));
            setSelectedSection(updatedSection);
        }
    };

    const updateColumnProperties = (updatedProperties: Partial<Column>) => {
        if (selectedColumn) {
            const updatedColumn = { ...selectedColumn, ...updatedProperties };
            setSections((prevSections) =>
                prevSections.map((sec) => ({
                    ...sec,
                    columns: sec.columns.map((col) => (col.id === updatedColumn.id ? updatedColumn : col)),
                }))
            );
            setSelectedColumn(updatedColumn);
        }
    };

    const updateElementProperties = (updatedProperties: Partial<FormElement>) => {
        if (selectedElement) {
            const updatedElement = { ...selectedElement, ...updatedProperties };
            setElements((prevElements) => prevElements.map((el) => (el.id === updatedElement.id ? updatedElement : el)));
            setSelectedElement(updatedElement);
        }
    };

    const updateTableColumnProperties = (updatedProperties: Partial<TableColumn>) => {
        if (selectedTableColumn) {
            const { elementId, columnIndex } = selectedTableColumn;
            const element = elements.find((el) => el.id === elementId);
            if (element && element.tableColumns) {
                const updatedColumns = [...element.tableColumns];
                updatedColumns[columnIndex] = { ...updatedColumns[columnIndex], ...updatedProperties };
                const updatedElement = { ...element, tableColumns: updatedColumns };
                setElements((prevElements) => prevElements.map((el) => (el.id === elementId ? updatedElement : el)));
            }
        }
    };

    const duplicateElement = (elementId: string) => {
        const elementToDuplicate = elements.find((el) => el.id === elementId);
        if (elementToDuplicate) {
            const newElement = {
                ...elementToDuplicate,
                id: `${elementToDuplicate.type}-${Date.now()}`,
            };
            setElements([...elements, newElement]);
        }
    };

    const moveColumn = (columnId: string, newSectionId: string) => {
        setSections((prevSections) =>
            prevSections.map((section) => ({
                ...section,
                columns: section.columns.filter((col) => col.id !== columnId),
            }))
        );
        setSections((prevSections) =>
            prevSections.map((section) =>
                section.id === newSectionId
                    ? {
                          ...section,
                          columns: [...section.columns, { id: columnId, sectionId: newSectionId }],
                      }
                    : section
            )
        );

        // Perbarui columnId dari elemen-elemen form yang terkait
        setElements((prevElements) => prevElements.map((element) => (element.columnId === columnId ? { ...element, columnId, sectionId: newSectionId } : element)));
    };

    // Memindahkan section ke posisi baru
    const moveSection = (sectionId: string, newIndex: number) => {
        const section = sections.find((sec) => sec.id === sectionId);
        if (!section) return;

        const newSections = sections.filter((sec) => sec.id !== sectionId);
        newSections.splice(newIndex, 0, section);

        setSections(newSections);
    };

    // Fungsi untuk menghasilkan JSON form
    const generateFormJson = () => {
        return {
            formName: formName,
            sections: sections.map((section) => ({
                id: section.id,
                label: section.label || '',
                name: section.name || '',
                description: section.description || '',
                columns: section.columns.map((column) => ({
                    id: column.id,
                    label: column.label || '',
                    name: column.name || '',
                    description: column.description || '',
                    elements: elements
                        .filter((el) => el.columnId === column.id)
                        .map((el) => ({
                            id: el.id,
                            sectionId: section.id || '',
                            columnId: column.id || '',
                            order: el.order || '',
                            type: el.type,
                            label: el.label || '',
                            name: el.name || '',
                            length: el.length || 0,
                            mandatory: el.mandatory || false,
                            notNullable: el.notNullable || false,
                            options: el.options || [],
                            defaultValue: el.defaultValue || '',
                            hidden: el.hidden || false,
                            readOnly: el.readOnly || false,
                            unique: el.unique || false,
                            description: el.description || '',
                            placeholder: el.placeholder || '',
                        })),
                })),
            })),
        };
    };

    // Fungsi untuk memilih section
    const handleSelectSection = (section: Section) => {
        setSelectedSection(section);
        setSelectedColumn(null); // Reset selected column
        setSelectedElement(null); // Reset selected element
        setSelectedTableColumn(null);
    };

    // Fungsi untuk memilih column
    const handleSelectColumn = (column: Column) => {
        setSelectedColumn(column);
        setSelectedSection(null); // Reset selected section
        setSelectedElement(null); // Reset selected element
        setSelectedTableColumn(null);
    };

    // Fungsi untuk memilih form element
    const handleSelectElement = (element: FormElement) => {
        setSelectedElement(element);
        setSelectedSection(null); // Reset selected section
        setSelectedColumn(null); // Reset selected column
        setSelectedTableColumn(null);
    };

    // Fungsi untuk memilih kolom tabel
    const handleSelectTableColumn = (elementId: string, columnIndex: number) => {
        setSelectedTableColumn({ elementId, columnIndex });
        setSelectedElement(null); // Reset selected element
        setSelectedSection(null); // Reset selected section
        setSelectedColumn(null); // Reset selected column
    };

    const handleAddElement = (columnId: string, type: string, sectionId: string) => {
        const newElement: FormElement = {
            id: `${type}-${Date.now()}`, // ID unik berdasarkan timestamp
            type,
            sectionId,
            columnId,
            order: elements.filter((el) => el.columnId === columnId).length, // Urutan elemen dalam column
            // label: `${type} Field`, // Label default
            name: `${type}-${Date.now()}`, // ID unik berdasarkan timestamp
            tableColumns: type === 'table' ? [{ id: `column-${Date.now()}`, label: 'Column 1', name: 'column_1', type: 'text', mandatory: false }] : undefined, // Kolom default untuk tabel
            // tableData: type === 'table' ? [[]] : undefined, // Data default untuk tabel
        };
        setElements([...elements, newElement]);
    };

    const handleUpdateTableColumn = (updatedElement: FormElement) => {
        setElements((prevElements) =>
            prevElements.map((el) => (el.id === updatedElement.id ? updatedElement : el))
        );
    };



    return {
        elements,
        sections,
        selectedElement,
        selectedSection,
        selectedColumn,
        selectedTableColumn,
        setSelectedElement,
        setSelectedSection,
        setSelectedColumn,
        setSelectedTableColumn,
        moveElement,
        handleDrop,
        addColumn,
        addSection,
        deleteElement,
        deleteColumn,
        deleteSection,
        updateSectionProperties,
        updateColumnProperties,
        updateElementProperties,
        updateTableColumnProperties,
        generateFormJson,
        duplicateElement,
        moveColumn,
        moveSection,
        handleSelectSection,
        handleSelectColumn,
        handleSelectElement,
        handleSelectTableColumn,
        handleAddElement,
        handleUpdateTableColumn,
    };
};