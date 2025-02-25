import React from 'react';
import { useDrag } from 'react-dnd';

interface ToolboxItemProps {
  type: string;
  label: string;
}

const ToolboxItem: React.FC<ToolboxItemProps> = ({ type, label }) => {
  const [, drag] = useDrag({
    type: 'form-element',
    item: { type },
  });

  return (
    <div ref={drag} style={{ padding: '8px', margin: '4px', border: '1px solid #ccc', cursor: 'move' }}>
      {label}
    </div>
  );
};

export const Toolbox: React.FC = () => {
  return (
    <div>
      <ToolboxItem type="input" label="Input Field" />
      <ToolboxItem type="textarea" label="Text Area" />
      <ToolboxItem type="button" label="Button" />
    </div>
  );
};