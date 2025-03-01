import React from 'react';
import List from '../../components/Entity/List';

const ProductList = () => {
    const columns = [
        { accessor: 'no', title: 'No', sortable: false, hidden: false },
        { accessor: 'date-1740703591391', title: 'Date-1740703591391', sortable: true, hidden: false },
        { accessor: 'datetime-1740703594097', title: 'Datetime-1740703594097', sortable: true, hidden: false },
        { accessor: 'integer-1740703598549', title: 'Integer-1740703598549', sortable: true, hidden: false },
        { accessor: 'float-1740703601418', title: 'Float-1740703601418', sortable: true, hidden: false },
        { accessor: 'long-text-1740703606423', title: 'Long-text-1740703606423', sortable: true, hidden: false },
        { accessor: 'code-1740703640069', title: 'Code-1740703640069', sortable: true, hidden: false },
        { accessor: 'color-1740703644650', title: 'Color-1740703644650', sortable: true, hidden: false },
        { accessor: 'image-1740703648951', title: 'Image-1740703648951', sortable: true, hidden: false },
        { accessor: 'name', title: 'Name', sortable: true, hidden: false },
        { accessor: 'textarea-1740703583590', title: 'Textarea-1740703583590', sortable: true, hidden: false },
        { accessor: 'checkbox-1740703589387', title: 'Checkbox-1740703589387', sortable: true, hidden: false },
        { accessor: 'small-text-1740703614280', title: 'Small-text-1740703614280', sortable: true, hidden: false },
        { accessor: 'password-1740703609644', title: 'Password-1740703609644', sortable: true, hidden: false },
        { accessor: 'select-1740703619623', title: 'Select-1740703619623', sortable: true, hidden: false },
        { accessor: 'time-1740703636782', title: 'Time-1740703636782', sortable: true, hidden: false },
        { accessor: 'text-editor-1740703660481', title: 'Text-editor-1740703660481', sortable: true, hidden: false },
        { accessor: 'multiple-select-1740703664854', title: 'Multiple-select-1740703664854', sortable: true, hidden: false },
        { accessor: 'markdown-editor-1740703656177', title: 'Markdown-editor-1740703656177', sortable: true, hidden: false },
        { accessor: 'button-1740703586099', title: 'Button-1740703586099', sortable: true, hidden: false },
        { accessor: 'created_at', title: 'Created At', sortable: true, hidden: false },
        { accessor: 'updated_at', title: 'Updated At', sortable: true, hidden: false }
    ];

    return (
        <List columns={columns} />
    );
};

export default ProductList;