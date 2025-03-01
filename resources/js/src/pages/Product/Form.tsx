import React from 'react';
import FormBuilderForm from "../../components/Entity/Form/FormBuilderForm";
import { useCrudApi } from '../../redux/api/useCrudApi';
import { entityUrl } from '../../components/tools';

const MyForm = () => {
    const form_name = entityUrl()
    const { 
        useGetSingleDataQuery, 
    } = useCrudApi("builders");
    const { data } = useGetSingleDataQuery({ id: form_name }, { skip: !form_name });
    const parsedSections = data?.sections ? JSON.parse(data.sections) : [];

    console.log(parsedSections)

    return <FormBuilderForm entity="products" sections={parsedSections} />;
};

export default MyForm;