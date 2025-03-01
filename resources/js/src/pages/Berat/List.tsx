import React from 'react';
import List from '../../components/Entity/List';

const BeratList = () => {
    const columns = [
        { accessor: 'no', title: 'No', sortable: false, hidden: false },
        { accessor: 'input-1740634303844', title: 'Input-1740634303844', sortable: true, hidden: false },
        { accessor: 'button-1740656882843', title: 'Button-1740656882843', sortable: true, hidden: false },
        { accessor: 'created_at', title: 'Created At', sortable: true, hidden: false },
        { accessor: 'updated_at', title: 'Updated At', sortable: true, hidden: false }
    ];

    return (
        <List columns={columns} />
    );
};

export default BeratList;