import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FormArea } from './FormArea';
import { PropertiesSidebar } from './PropertiesSidebar';
import { useFormBuilder } from './useFormBuilder';
import { useParams } from 'react-router-dom';
import { Column, Section } from './types';
import { useCrudApi } from '../../redux/api/useCrudApi';

const App: React.FC = () => {
    const { form_name } = useParams();
    const { 
        useGetSingleDataQuery, 
        useUpdateDataMutation,
    } = useCrudApi("builders");

    const showFormJson = () => {
        const formJson = generateFormJson();
        console.log(JSON.stringify(formJson, null, 2));

        handleUpdate();
    };

    const { data } = useGetSingleDataQuery({ id: form_name }, { skip: !form_name });
    const [update, { isSuccess: isSuccessUpdate, error: errorUpdate }] = useUpdateDataMutation();

    // Parse sections dari string JSON ke array objek
    const parsedSections = data?.sections ? JSON.parse(data.sections) : [];
    const formName = data?.form_name && data.form_name;

    // Extract elements dari parsedSections
    const initialElements = parsedSections.flatMap((section: Section) =>
        section.columns.flatMap((column: Column) => column.elements || [])
    );

    const {
        elements,
        sections,
        selectedElement,
        selectedSection,
        selectedColumn,
        selectedTableColumn,
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
    } = useFormBuilder({ formName, sections: parsedSections, elements: initialElements });
    const handleUpdate = async () => {
        const formJson = generateFormJson(); // Generate JSON dari form builder
        const requestData = {
            _method: "PUT",
            sections: formJson.sections
        };

        await update({ id: form_name, data: requestData});
    };


    return (
        <DndProvider backend={HTML5Backend}>
            <button onClick={showFormJson} className="btn btn-primary mb-5">
                Show Form JSON
            </button>

            <div className="flex">
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