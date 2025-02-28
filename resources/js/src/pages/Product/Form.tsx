import React from 'react';
import FormBuilderForm from "../../components/Entity/Form/FormBuilderForm";

const sections = [
    {
        id: 'section-1',
        label: 'Personal Information',
        columns: [
            {
                id: 'column-1',
                elements: [
                    { id: 'name', name: 'name', type: 'input', label: 'Name', required: true },
                    { id: 'email', name: 'email', type: 'input', label: 'Email', required: true },
                ],
            },
        ],
    },
];

const MyForm = () => {
    return <FormBuilderForm entity="products" sections={sections} />;
};

export default MyForm;