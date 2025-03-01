import React from 'react';
import List from '../../components/Entity/List';

const CategoryList = () => {
    const columns = [
        { accessor: 'no', title: 'No', sortable: false, hidden: false },
        { accessor: 'input-1740634303844', title: 'Input-1740634303844', sortable: true, hidden: false },
        { accessor: 'textarea-1740700415653', title: 'Textarea-1740700415653', sortable: true, hidden: false },
        { accessor: 'input-1740700422295', title: 'Input-1740700422295', sortable: true, hidden: false },
        { accessor: 'date-1740700424405', title: 'Date-1740700424405', sortable: true, hidden: false },
        { accessor: 'textarea-1740700428889', title: 'Textarea-1740700428889', sortable: true, hidden: false },
        { accessor: 'time-1740700435536', title: 'Time-1740700435536', sortable: true, hidden: false },
        { accessor: 'button-1740700439673', title: 'Button-1740700439673', sortable: true, hidden: false },
        { accessor: 'created_at', title: 'Created At', sortable: true, hidden: false },
        { accessor: 'updated_at', title: 'Updated At', sortable: true, hidden: false }
    ];

    return (
        <List columns={columns} />
    );
};

export default CategoryList;