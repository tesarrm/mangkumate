import React from 'react';
import List from '../../components/Entity/List';

const StoreList = () => {
    const columns = [
        { accessor: 'no', title: 'No', sortable: false, hidden: false },
        { accessor: 'input', title: 'Input', sortable: true, hidden: false },
        { accessor: 'textarea', title: 'Textarea', sortable: true, hidden: false },
        { accessor: 'checkbox', title: 'Checkbox', sortable: true, hidden: false },
        { accessor: 'date', title: 'Date', sortable: true, hidden: false },
        { accessor: 'datetime', title: 'Datetime', sortable: true, hidden: false },
        { accessor: 'integer', title: 'Integer', sortable: true, hidden: false },
        { accessor: 'float', title: 'Float', sortable: true, hidden: false },
        { accessor: 'password', title: 'Password', sortable: true, hidden: false },
        { accessor: 'select', title: 'Select', sortable: true, hidden: false },
        { accessor: 'time', title: 'Time', sortable: true, hidden: false },
        { accessor: 'code', title: 'Code', sortable: true, hidden: false },
        { accessor: 'color', title: 'Color', sortable: true, hidden: false },
        { accessor: 'image', title: 'Image', sortable: true, hidden: false },
        { accessor: 'created_at', title: 'Created At', sortable: true, hidden: false },
        { accessor: 'updated_at', title: 'Updated At', sortable: true, hidden: false }
    ];

    return (
        <List columns={columns} />
    );
};

export default StoreList;