import React from 'react';

interface AddColumnButtonProps {
  onAddColumn: () => void;
}

export const AddColumnButton: React.FC<AddColumnButtonProps> = ({ onAddColumn }) => {
  return (
    <button onClick={onAddColumn} style={{ margin: '8px', padding: '8px' }}>
      + Add Column
    </button>
  );
};