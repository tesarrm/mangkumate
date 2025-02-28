/**
 * # Fiture Form
 * - dinamis form input
 * - form input type: text, number, select, image
 * - yup validation
 * - layouting 3 column
 * - section form
 * - validation error 
 */

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Breadcrumb from '../Breadcumb';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
// import { useCrudApi } from '../../redux/features/api/useCrudApi';
import { useCrudApi } from '../../redux/api/useCrudApi';
import Select from 'react-select';

interface Field {
    name: string;
    label: string;
    type: string;
    options?: { value: string; label: string }[];
    required?: boolean;
    column?: number; // Kolom tempat field akan ditempatkan (1, 2, atau 3)
}

interface Section {
    section: number;
    sectionTitle?: string;
    fields: Field[];
}

const entityUrl = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const entity = pathnames[0];

    return entity;
}

interface GenericFormProps {
    entity?: string;
    fields: Section[];
    imageUpload?: boolean;
    imageFieldName?: string;
    imageUrlPrefix?: string;
}

const GenericForm = ({
    entity = entityUrl(),
    fields,
    imageUpload = false,
    imageFieldName = 'photo',
    imageUrlPrefix = '',
}: GenericFormProps) => {
    const { 
        useGetSingleDataQuery, 
        useStoreDataMutation, 
        useUpdateDataMutation,
    } = useCrudApi(entity);
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = useGetSingleDataQuery({ id }, { skip: !id });
    const [store, { data: dataStore, isSuccess: isSuccessStore, error: errorStore }] = useStoreDataMutation();
    const [update, { isSuccess: isSuccessUpdate, error: errorUpdate }] = useUpdateDataMutation();
    const [externalErrors, setExternalErrors] = useState<Record<string, string>>({});
    const [initialValues, setInitialStatus] = useState(data || {})

    useEffect(() => {
        if(data) {
            setInitialStatus(data)
        }
    }, [data])

    const onSubmit = async (values: any, formData: FormData) => {
        if (id) {
            formData.append("_method", "PUT");
            await update({ id, data: formData });
        } else {
            await store({ data: formData });
        }
    };

    // status
    useEffect(() => {
        if (isSuccessStore) {
            toast.success("Create Successfully")
            navigate(`/${entity}/${dataStore.data.id}`);
        }
        if (isSuccessUpdate) {
            toast.success("Update Successfully")
        }
        if (errorStore) {
            const errorData = errorStore as any;
            if (errorData.data.errors) {
                const newErrors: Record<string, string> = {};
                Object.keys(errorData.data.errors).forEach((key) => {
                    newErrors[key] = errorData.data.errors[key][0];
                });
                setExternalErrors(newErrors);
            }
        }
        if (errorUpdate) {
            const errorData = errorUpdate as any;
            if (errorData.data.errors) {
                const newErrors: Record<string, string> = {};
                Object.keys(errorData.data.errors).forEach((key) => {
                    newErrors[key] = errorData.data.errors[key][0];
                });
                setExternalErrors(newErrors);
            }
        }
    }, [isSuccessStore, isSuccessUpdate, errorStore, errorUpdate])

    const generateInitialValues = (fields: Section[], data: any) => {
        const initialValues: Record<string, any> = {};

        fields.forEach((section) => {
            section.fields.forEach((field) => {
                if (data && data[field.name] !== undefined) {
                    initialValues[field.name] = data[field.name];
                } else {
                    initialValues[field.name] = field.type === "number" ? 0 : ""; 
                }
            });
        });

        return initialValues;
    };

    const generateValidationSchema = (fields) => {
        const schema: Record<string, any> = {};

        fields.forEach((section) => {
            section.fields.forEach((field) => {
                if (field.validation) {
                    schema[field.name] = field.validation;
                }
            });
        });

        return Yup.object().shape(schema);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: generateInitialValues(fields, initialValues),
        validationSchema: generateValidationSchema(fields),
        onSubmit: async (values) => {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                if (values[key] !== null && values[key] !== undefined) {
                    formData.append(key, values[key]);
                }
            });

            await onSubmit(values, formData);
        },
    });

    // Set error dari externalErrors ke formik jika berubah
    useEffect(() => {
        if (Object.keys(externalErrors).length > 0) {
            formik.setErrors(externalErrors);
        }
    }, [externalErrors]);

    const { values, errors, touched, handleChange, handleSubmit } = formik;

    // image
    const [images, setImages] = useState<any>([]);

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
        if (imageList.length > 0) {
            formik.setFieldValue(imageFieldName, imageList[0].file);
        } else {
            formik.setFieldValue(imageFieldName, null);
        }
    };

    useEffect(() => {
        if (initialValues[imageFieldName]) {
            const initialImage = {
                dataURL: `${imageUrlPrefix}${initialValues[imageFieldName]}`,
                file: null,
            };
            setImages([initialImage]);
        }
    }, [initialValues, imageFieldName, imageUrlPrefix]);

    // field
    const renderField = (field: Field) => {
        switch (field.type) {
            case 'image':
                return (
                    <div key={field.name} className="custom-file-container">
                        <span className="mb-1.5 block font-semibold">
                            {field.label}
                            {field.required && (<span className="text-danger">*</span>)}
                        </span>
                        <label className="custom-file-container__custom-file"></label>
                        <input
                            hidden
                            id="photo"
                            name="photo"
                            type="file"
                            accept="image/*"
                            onChange={(event: any) => {
                                const file = event.currentTarget.files[0];
                                formik.setFieldValue("photo", file);

                                // Set gambar baru ke pratinjau
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    setImages([{ dataURL: e.target?.result, file }]);
                                };
                                if (file) reader.readAsDataURL(file);
                            }}
                            className="custom-file-container__custom-file__custom-file-input"
                        />
                        <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />

                        <ImageUploading value={images} onChange={onChange} maxNumber={69}>
                            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                <div className="upload__image-wrapper">
                                    <button
                                        type="button"
                                        className="custom-file-container__custom-file__custom-file-control"
                                        onClick={onImageUpload}
                                        {...dragProps}
                                        style={isDragging ? { backgroundColor: "#afafaf" } : undefined}
                                    >
                                        Choose File...
                                    </button> 
                                    &nbsp;
                                    {imageList.map((image, index) => (
                                        <div key={index} className="custom-file-container__image-preview relative">
                                            <img src={image.dataURL} alt="img" className="m-auto" />
                                            {/* <button onClick={() => onImageRemove(index)}>Remove</button> */}

                                             <button
                                                 type="button"
                                                 className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded"
                                                 onClick={() => onImageRemove(0)}
                                             >
                                                 ×
                                             </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ImageUploading>

                        {images.length === 0 ? <img src="/assets/images/file-preview.svg" className="max-w-md w-full m-auto" alt="" /> : ''}

                        {errors[field.name] && touched[field.name] && (
                            <span className="text-red-500 block mt-2">
                                {String(errors[field.name])}
                            </span>
                        )}
                    </div>
                );

            case 'select':
                return (
                    <div key={field.name} className={`${errors[field.name] && touched[field.name] && "has-error"}`}>
                        <label htmlFor={field.name}>{field.label}{field.required && <span className="text-danger">*</span>}</label>
                        <Select
                            id={field.name}
                            placeholder="Select an option"
                            options={field.options}
                            value={field.options && field.options.find(option => option.value === values[field.name])} // Menyesuaikan nilai awal
                            onChange={(selectedOption) => formik.setFieldValue(field.name, selectedOption ? selectedOption.value : '')} // Set value di formik
                            onBlur={() => formik.setFieldTouched(field.name, true)} // Tandai sebagai touched
                            isSearchable={true} // Aktifkan fitur pencarian
                            className="text-white-dark"
                        />
                        {errors[field.name] && touched[field.name] && (
                            <span className="text-red-500 block mt-2">
                                {String(errors[field.name])}
                            </span>
                        )}
                    </div>
                );

            case 'textarea':
                return (
                    <div key={field.name} className="sm:col-span-2">
                        <label htmlFor={field.name}>{field.label}{field.required && <span className="text-danger">*</span>}</label>
                        <textarea
                            id={field.name}
                            rows={3}
                            placeholder={`Enter ${field.label}`}
                            className="form-textarea"
                            value={values[field.name]}
                            onChange={handleChange}
                        ></textarea>
                        {errors[field.name] && touched[field.name] && (
                            <span className="text-red-500 block mt-2">
                                {String(errors[field.name])}
                            </span>
                        )}
                    </div>
                );

            default:
                return (
                    <div key={field.name} className={`${errors[field.name] && touched[field.name] && "has-error"}`}>
                        <label htmlFor={field.name}>{field.label}{field.required && <span className="text-danger">*</span>}</label>
                        <input
                            id={field.name}
                            type={field.type}
                            placeholder={`Enter ${field.label}`}
                            className="form-input"
                            value={values[field.name]}
                            onChange={handleChange}
                        />
                        {errors[field.name] && touched[field.name] && (
                            <span className="text-red-500 block mt-2">
                                {String(errors[field.name])}
                            </span>
                        )}
                    </div>
                );
        }
    };

    // scroll
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20); // Aktif jika scroll lebih dari 20px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div className={`sticky top-14 z-10 flex items-center justify-between gap-4 mb-5 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm mx-[-1.50rem] px-6 py-4" : ""}`}>
                <Breadcrumb />

                {/* <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto"> */}
                    {/* <div className="relative"> */}
                        <div className="flex items-center gap-2">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    {/* </div> */}
                {/* </div> */}
            </div>

            <div className="panel" id="forms_grid">
                <div className="mb-5">
                    {fields.map((section) => (
                        <div key={section.section} className="mb-8">
                            {section.sectionTitle ? (
                                <>
                                    <h3 className="text-lg font-semibold mb-4">{section.sectionTitle}</h3>
                                    <hr className="mb-4 mx-[-1.25rem] border-gray-200 dark:border-gray-700" />
                                </>
                            ) : section.section == 1 ? (
                                <></>
                            ) : (
                                <hr className="my-10 mx-[-1.25rem] border-gray-200 dark:border-gray-700" />
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                {/* Kolom 1 */}
                                <div className="space-y-5">
                                    {section.fields.filter((field) => field.column === 1).map((field) => renderField(field))}
                                </div>
                                {/* Kolom 2 */}
                                <div className="space-y-5">
                                    {section.fields.filter((field) => field.column === 2).map((field) => renderField(field))}
                                </div>
                                {/* Kolom 3 */}
                                <div className="space-y-5">
                                    {section.fields.filter((field) => field.column === 3).map((field) => renderField(field))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </form>
    );
};

export default GenericForm;