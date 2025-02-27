import React, { useEffect, useState } from 'react';
import List from '../../components/Entity/List';

// Default columns and configuration
const defaultColumns = [
    { accessor: 'no', title: 'No', sortable: false, hidden: false },
    { accessor: 'name', title: 'Name', sortable: true, hidden: false },
    { accessor: 'created_at', title: 'Created At', sortable: true, hidden: false },
    { accessor: 'updated_at', title: 'Updated At', sortable: true, hidden: false }
];

const BuilderList = () => {
    const [customConfig, setCustomConfig] = useState<any>({});

    // Load custom configurations dynamically
    useEffect(() => {
        const loadCustomConfig = async () => {
            try {
                const config = await import('./custom_builder_list');
                setCustomConfig(config.default);
            } catch (error) {
                console.log('No custom configuration found, using default settings.');
            }
        };

        loadCustomConfig();
    }, []);

    // Use custom configurations if available, otherwise use defaults
    const columns = customConfig.columns || defaultColumns;
    const customRenderRow = customConfig.customRenderRow;
    const customActions = customConfig.customActions;
    const customFilters = customConfig.customFilters;
    const onRowClick = customConfig.onRowClick;

    return (
        <List
            columns={columns}
            customRenderRow={customRenderRow}
            customActions={customActions}
            customFilters={customFilters}
            onRowClick={onRowClick}
        />
    );
};

export default BuilderList;