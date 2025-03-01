import React from 'react';
import List from '../../components/Entity/List';

const ItemList = () => {
    const columns = [
        { accessor: 'no', title: 'No', sortable: false, hidden: false },
        { accessor: 'Name', title: 'Name', sortable: true, hidden: false },
        { accessor: 'qty', title: 'Qty', sortable: true, hidden: false },
        { accessor: 'buy_date', title: 'Buy Date', sortable: true, hidden: false },
        { accessor: 'created_at', title: 'Created At', sortable: true, hidden: false },
        { accessor: 'updated_at', title: 'Updated At', sortable: true, hidden: false }
    ];

    return (
        <List columns={columns} />
    );
};

export default ItemList;