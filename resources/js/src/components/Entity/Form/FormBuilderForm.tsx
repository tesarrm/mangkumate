import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Section } from '../../FormBuilder/types';
import { useCrudApi } from '../../../redux/api/useCrudApi';
import { FormElementComponent } from './FormElementComponent';

interface FormBuilderFormProps {
    entity: string;
    sections: Section[];
}

const FormBuilderForm: React.FC<FormBuilderFormProps> = ({ entity, sections }) => {
    const { useGetSingleDataQuery, useStoreDataMutation, useUpdateDataMutation } = useCrudApi(entity);
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = useGetSingleDataQuery({ id }, { skip: !id });
    const [store, { isSuccess: isSuccessStore, error: errorStore }] = useStoreDataMutation();
    const [update, { isSuccess: isSuccessUpdate, error: errorUpdate }] = useUpdateDataMutation();
    const [initialValues, setInitialValues] = useState<Record<string, any>>({});

    // Generate initial values dari sections
    useEffect(() => {
        if (data) {
            const values: Record<string, any> = {};
            sections.forEach((section) => {
                section.columns.forEach((column) => {
                    column.elements.forEach((element) => {
                        values[element.name] = data[element.name] || '';
                    });
                });
            });
            setInitialValues(values);
        }
    }, [data, sections]);

    // Generate validation schema dari sections
    const generateValidationSchema = (sections: Section[]) => {
        const schema: Record<string, any> = {};

        sections.forEach((section) => {
            section.columns.forEach((column) => {
                column.elements.forEach((element) => {
                    if (element.required) {
                        schema[element.name] = Yup.string().required(`${element.label} is required`);
                    }
                });
            });
        });

        return Yup.object().shape(schema);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: generateValidationSchema(sections),
        onSubmit: async (values) => {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                if (values[key] !== null && values[key] !== undefined) {
                    formData.append(key, values[key]);
                }
            });

            if (id) {
                formData.append('_method', 'PUT');
                await update({ id, data: formData });
            } else {
                await store({ data: formData });
            }
        },
    });

    // Handle success dan error
    useEffect(() => {
        if (isSuccessStore) {
            toast.success('Data created successfully');
            navigate(`/${entity}`);
        }
        if (isSuccessUpdate) {
            toast.success('Data updated successfully');
        }
        if (errorStore || errorUpdate) {
            const errorData = (errorStore || errorUpdate) as any;
            if (errorData.data.errors) {
                const newErrors: Record<string, string> = {};
                Object.keys(errorData.data.errors).forEach((key) => {
                    newErrors[key] = errorData.data.errors[key][0];
                });
                formik.setErrors(newErrors);
            }
        }
    }, [isSuccessStore, isSuccessUpdate, errorStore, errorUpdate]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="panel">
                {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">{section.label || `Section ${sectionIndex + 1}`}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {section.columns.map((column, columnIndex) => (
                                <div key={columnIndex} className="space-y-5">
                                    {column.elements.map((element) => (
                                        <FormElementComponent
                                            key={element.id}
                                            element={element}
                                            value={formik.values[element.name]}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched[element.name] && formik.errors[element.name]}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-5">
                <button type="submit" className="btn btn-primary">
                    {id ? 'Update' : 'Save'}
                </button>
            </div>
        </form>
    );
};

export default FormBuilderForm;