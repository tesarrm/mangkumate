import React from 'react';

interface FormElement {
  id: string;
  type: string;
}

interface Column {
  id: string;
  elements: FormElement[];
}

interface Section {
  id: string;
  columns: Column[];
}

// type FormLayout = Section[];

interface MoveElementDropdownProps {
  sections: Section[];
  currentElementId: string;
  onMoveElement: (elementId: string, targetSectionId: string, targetColumnId: string) => void;
}

export const MoveElementDropdown: React.FC<MoveElementDropdownProps> = ({
  sections,
  currentElementId,
  onMoveElement,
}) => {
  const handleMove = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [sectionId, columnId] = event.target.value.split('|');
    onMoveElement(currentElementId, sectionId, columnId);
  };

  return (
    <select onChange={handleMove} style={{ marginLeft: '8px' }}>
      <option value="">Move to...</option>
      {sections.map((section) =>
        section.columns.map((column) => (
          <option key={`${section.id}-${column.id}`} value={`${section.id}|${column.id}`}>
            Section {section.id}, Column {column.id}
          </option>
        )),
      )}
    </select>
  );
};