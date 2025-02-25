import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FormArea } from './FormArea';
import { PropertiesSidebar } from './PropertiesSidebar';
import { Column, FormElement, Section, TableColumn } from './types';

const App: React.FC = () => {
    const [elements, setElements] = useState<FormElement[]>([]);
    const [selectedElement, setSelectedElement] = useState<FormElement | null>(null);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);
    const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);

    // Memindahkan elemen ke section dan column yang baru
    const moveElement = (elementId: string, newSectionId: string, newColumnId: string, newOrder: number) => {
        setElements((prevElements) => prevElements.map((element) => (element.id === elementId ? { ...element, sectionId: newSectionId, columnId: newColumnId, order: newOrder } : element)));
    };

    // Menangani drop elemen baru
    const handleDrop = (item: any, sectionId: string, columnId: string, targetOrder?: number) => {
        if (item.elementId) {
            // Jika elemen dipindahkan (bukan elemen baru)
            const newOrder = targetOrder !== undefined ? targetOrder : elements.length;
            moveElement(item.elementId, sectionId, columnId, newOrder);
        } else {
            // Jika elemen baru di-drop dari toolbox
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

    // Menambahkan column baru ke section
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

    // Menambahkan section baru
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

    // Memindahkan column ke section yang baru
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

    // Menghapus form elemen
    const deleteElement = (elementId: string) => {
        if (window.confirm('Are you sure you want to delete this form element?')) {
            setElements((prevElements) => prevElements.filter((element) => element.id !== elementId));
        }
    };

    // Menghapus column dan semua form elemen di dalamnya
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

    // Menghapus section dan semua column serta form elemen di dalamnya
    const deleteSection = (sectionId: string) => {
        if (window.confirm('Are you sure you want to delete this section and all its columns and form elements?')) {
            setSections((prevSections) => prevSections.filter((section) => section.id !== sectionId));
            setElements((prevElements) => prevElements.filter((element) => element.sectionId !== sectionId));
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

    const generateFormJson = () => {
        const formJson = {
            formName: "Company",
            sections: sections.map((section) => ({
                id: section.id,
                label: section.label || '', // Tambahkan label section
                name: section.name || '', // Tambahkan name section
                description: section.description || '', // Tambahkan description section
                columns: section.columns.map((column) => ({
                    id: column.id,
                    label: column.label || '', // Tambahkan label column
                    name: column.name || '', // Tambahkan name column
                    description: column.description || '', // Tambahkan description column
                    elements: elements
                        .filter((el) => el.columnId === column.id)
                        .map((el) => ({
                            id: el.id,
                            type: el.type,
                            label: el.label || '', // Tambahkan label elemen
                            name: el.name || '', // Tambahkan name elemen
                            length: el.length || 0, // Tambahkan length elemen
                            mandatory: el.mandatory || false, // Tambahkan mandatory elemen
                            notNullable: el.notNullable || false, // Tambahkan notNullable elemen
                            options: el.options || [], // Tambahkan options elemen
                            defaultValue: el.defaultValue || '', // Tambahkan defaultValue elemen
                            hidden: el.hidden || false, // Tambahkan hidden elemen
                            readOnly: el.readOnly || false, // Tambahkan readOnly elemen
                            unique: el.unique || false, // Tambahkan unique elemen
                            description: el.description || '', // Tambahkan description elemen
                            placeholder: el.placeholder || '', // Tambahkan placeholder elemen
                        })),
                })),
            })),
        };
        return formJson;
    };

    // Menampilkan JSON di console atau UI
    const showFormJson = () => {
        const formJson = generateFormJson();
        console.log(JSON.stringify(formJson, null, 2)); // Tampilkan di console
        // alert(JSON.stringify(formJson, null, 2)); // Tampilkan di alert
    };

    const [sections, setSections] = useState<Section[]>([
        {
            id: 'section-1',
            // label: 'Section 1',
            name: 'section_1',
            description: 'This is section 1',
            columns: [
                {
                    id: 'column-1',
                    // label: 'Column 1',
                    name: 'column_1',
                    description: 'This is column 1',
                    sectionId: 'section-1',
                },
            ],
        },
    ]);

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

    // Fungsi untuk memperbarui properti section
    const updateSectionProperties = (updatedProperties: Partial<Section>) => {
        if (selectedSection) {
            const updatedSection = { ...selectedSection, ...updatedProperties };
            setSections((prevSections) => prevSections.map((sec) => (sec.id === updatedSection.id ? updatedSection : sec)));
            setSelectedSection(updatedSection);
        }
    };

    // Fungsi untuk memperbarui properti column
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

    // Fungsi untuk memperbarui properti form element
    const updateElementProperties = (updatedProperties: Partial<FormElement>) => {
        if (selectedElement) {
            const updatedElement = { ...selectedElement, ...updatedProperties };
            setElements((prevElements) => prevElements.map((el) => (el.id === updatedElement.id ? updatedElement : el)));
            setSelectedElement(updatedElement);
        }
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

    const [selectedTableColumn, setSelectedTableColumn] = useState<{ elementId: string; columnIndex: number } | null>(null);

    // Fungsi untuk memilih kolom tabel
    const handleSelectTableColumn = (elementId: string, columnIndex: number) => {
        setSelectedTableColumn({ elementId, columnIndex });
        setSelectedElement(null); // Reset selected element
        setSelectedSection(null); // Reset selected section
        setSelectedColumn(null); // Reset selected column
    };

    // Fungsi untuk memperbarui properti kolom tabel
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

    const handleUpdateTableColumn = (updatedElement: FormElement) => {
        setElements((prevElements) =>
            prevElements.map((el) => (el.id === updatedElement.id ? updatedElement : el))
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <button onClick={showFormJson} className="btn btn-primary mb-5">
                Show Form JSON
            </button>

            <div className="flex">
                {/* <div style={{ flex: 1 }} className="panel p-0 flex-1"> */}
                {/* <div className="panel p-0 flex-1"> */}
                <div className="panel p-0 flex-1 overflow-auto">
                    {sections.map((section, index) => (
                        <FormArea
                            key={section.id}
                            section={section}
                            sections={sections}
                            elements={elements.filter((el) => el.sectionId === section.id)}
                            onDrop={(item, columnId, targetOrder) => handleDrop(item, section.id, columnId, targetOrder)}
                            addColumn={() => addColumn(section.id)}
                            deleteColumn={deleteColumn}
                            deleteSection={deleteSection}
                            deleteElement={deleteElement}
                            duplicateElement={duplicateElement}
                            moveColumn={moveColumn}
                            moveSection={moveSection}
                            sectionIndex={index}
                            onSelectSection={handleSelectSection}
                            onSelectColumn={handleSelectColumn}
                            onSelectElement={handleSelectElement}
                            onAddElement={handleAddElement}
                            addSection={addSection}
                            onSelectTableColumn={handleSelectTableColumn}
                            handleUpdateTableColumn={handleUpdateTableColumn}
                        />
                    ))}
                </div>

                {/* Sidebar Properties */}
                {selectedSection && <PropertiesSidebar type="section" data={selectedSection} onUpdate={updateSectionProperties} />}
                {selectedColumn && <PropertiesSidebar type="column" data={selectedColumn} onUpdate={updateColumnProperties} />}
                {selectedElement && <PropertiesSidebar type="element" data={selectedElement} onUpdate={updateElementProperties} />}
                {/* {selectedTableColumn && <PropertiesSidebar type="table-column" data={elements.find((el) => el.id === selectedTableColumn.elementId)} onUpdate={updateTableColumnProperties} />} */}
                {selectedTableColumn && (
                    <PropertiesSidebar
                        type="table-column"
                        data={elements.find((el) => el.id === selectedTableColumn.elementId)?.tableColumns?.[selectedTableColumn.columnIndex]}
                        onUpdate={updateTableColumnProperties}
                    />
                )}
            </div>
        </DndProvider>
    );
};

export default App;
