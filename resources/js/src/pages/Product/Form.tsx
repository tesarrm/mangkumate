import React from 'react';
import FormBuilderForm from "../../components/Entity/Form/FormBuilderForm";
import { entityUrl } from '../../components/tools';
import { useGetSingleDataBuilderQuery } from '../../redux/api/testApi';

const MyForm = () => {
    const form_name = entityUrl()
    const { data: dataForm } = useGetSingleDataBuilderQuery({ id: form_name }, { skip: !form_name });
    const parsedSections = dataForm?.sections ? JSON.parse(dataForm.sections) : [];

    return <FormBuilderForm sections={parsedSections} />;
};

export default MyForm;