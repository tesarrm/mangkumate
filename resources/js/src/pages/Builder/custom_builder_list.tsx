import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import IconPlus from '../../components/Icon/IconPlus';

// Custom Render Row
export const customRenderRow = (record: any) => {
    return (
        <tr key={record.id}>
            <td>{record.no}</td>
            <td>{record.name}</td>
            <td>{record.created_at}</td>
            <td>{record.updated_at}</td>
            <td>
                <button onClick={() => alert(`Edit ${record.name}`)}>Edit</button>
                <button onClick={() => alert(`Delete ${record.name}`)}>Delete</button>
            </td>
        </tr>
    );
};

// Custom Actions
// export const customActions = (
export const CustomActions = ({ toggleModal }: { toggleModal: (id: string) => void }) => {
    return (
    <div className="flex items-center gap-2">
        <Link to={`/import`} className="btn btn-warning gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.5" d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" 
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" 
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hidden sm:inline">Import</span>
        </Link>
        <button onClick={() => toggleModal('modal1')} className="btn btn-primary gap-2">
            <IconPlus />
            <span className="hidden sm:inline">Create</span>
        </button>
    </div>
)};

// Custom Filters
export const customFilters = (
    <div className="sm:col-span-5 md:col-span-6 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        <select className="form-select">
            <option value="">Custom Filter 1</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
        </select>
        <input type="text" className="form-input" placeholder="Custom Filter 2" />
    </div>
);

// Custom Row Click Behavior
export const onRowClick = (record: any) => {
    alert(`You clicked on ${record.name}`);
};

// // Fungsi untuk membuat file JSON
// const createJsonFile = (formName: string) => {
//     const jsonData = {
//         formName: formName,
//         sections: []
//     };

//     // Format nama file: [datetimenow]_nama_entity.json
//     const datetimeNow = new Date().toISOString().replace(/[:.-]/g, '_'); // Format tanggal dan waktu
//     const fileName = `${datetimeNow}_${formName}.json`;

//     // Buat blob dari JSON
//     const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });

//     // Buat link untuk mengunduh file
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
// };


import toast from 'react-hot-toast';
import { useCrudApi } from '../../redux/api/useCrudApi';

// Fungsi untuk mengirim data JSON ke Laravel
const saveJsonToDatabase = async (formName: string, navigate:any) => {
    const jsonData = {
        formName: formName,
        // sections: []
        // sections: [
        //     {
        //         id: "section-1",
        //         label: "",
        //         name: "section_1",
        //         description: "This is section 1",
        //         columns: [
        //             {
        //                 id: "column-1",
        //                 label: "",
        //                 name: "column_1",
        //                 description: "This is column 1",
        //                 elements: [
        //                     {
        //                         id: "input",
        //                         type: "input",
        //                         label: "",
        //                         name: "input",
        //                         length: 0,
        //                         mandatory: false,
        //                         notNullable: false,
        //                         options: [],
        //                         defaultValue: "",
        //                         hidden: false,
        //                         readOnly: false,
        //                         unique: false,
        //                         description: "",
        //                         placeholder: ""
        //                     },
        //                     // Tambahkan elemen lainnya sesuai kebutuhan
        //                 ]
        //             }
        //         ]
        //     }
        // ]

        sections: [
            {
                id: "section-1",
                label: "",
                name: "section_1",
                description: "This is section 1",
                columns: [
                    {
                        id: "column-1",
                        label: "",
                        name: "column_1",
                        description: "This is column 1",
                        elements: [
                            {
                                id: "input-1740634303844",
                                sectionId: "section-1",
                                columnId: "column-1",
                                order: "",
                                type: "input",
                                label: "asdf",
                                name: "input-1740634303844",
                                length: 0,
                                mandatory: false,
                                notNullable: false,
                                options: [],
                                defaultValue: "",
                                hidden: false,
                                readOnly: false,
                                unique: false,
                                description: "",
                                placeholder: ""
                            },
                            {
                                id: "textarea-1740634401968",
                                sectionId: "section-1",
                                columnId: "column-1",
                                order: 1,
                                type: "textarea",
                                label: "",
                                name: "textarea-1740634401968",
                                length: 0,
                                mandatory: false,
                                notNullable: false,
                                options: [],
                                defaultValue: "",
                                hidden: false,
                                readOnly: false,
                                unique: false,
                                description: "",
                                placeholder: ""
                            }
                        ]
                    },
                    {
                        id: "column-1740634403810",
                        label: "",
                        name: "",
                        description: "",
                        elements: [
                            {
                                id: "checkbox-1740634406622",
                                sectionId: "section-1",
                                columnId: "column-1740634403810",
                                order: "",
                                type: "checkbox",
                                label: "",
                                name: "checkbox-1740634406622",
                                length: 0,
                                mandatory: false,
                                notNullable: false,
                                options: [],
                                defaultValue: "",
                                hidden: false,
                                readOnly: false,
                                unique: false,
                                description: "",
                                placeholder: ""
                            }
                        ]
                    }
                ]
            }
        ]
    };

    try {
        const response = await fetch('http://localhost:8000/api/save-tablejson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
            throw new Error('Failed to save data to database.');
        }

        const result = await response.json();
        // console.log('Data saved successfully:', result);
        // alert('Data saved successfully!');

        if (result.data) {
            toast.success("Create Successfully")
            navigate(`/builders/${result.data.form_name}`);
        }
    } catch (error) {
        console.error('Error saving data:', error);
        alert('Failed to save data. Please try again.');
    }
};


// Contoh konten modal 1
export const ModalContent1 = ({ closeModal }: { closeModal: () => void }) => {
    const [formName, setFormName] = useState(''); // State untuk menyimpan input formName
    const navigate = useNavigate();
    const { 
        useStoreDataMutation, 
    } = useCrudApi("builders");
    const [store, { data: dataStore, isSuccess: isSuccessStore, error: errorStore }] = useStoreDataMutation();
    const jsonData = {
        formName: formName,
        sections: [
            {
                id: "section-1",
                label: "",
                name: "section_1",
                description: "This is section 1",
                columns: [
                    {
                        id: "column-1",
                        label: "",
                        name: "column_1",
                        description: "This is column 1",
                        elements: [
                            {
                                id: "input-1740634303844",
                                sectionId: "section-1",
                                columnId: "column-1",
                                order: "",
                                type: "input",
                                label: "asdf",
                                name: "input-1740634303844",
                                length: 0,
                                mandatory: false,
                                notNullable: false,
                                options: [],
                                defaultValue: "",
                                hidden: false,
                                readOnly: false,
                                unique: false,
                                description: "",
                                placeholder: ""
                            },
                            {
                                id: "textarea-1740634401968",
                                sectionId: "section-1",
                                columnId: "column-1",
                                order: 1,
                                type: "textarea",
                                label: "",
                                name: "textarea-1740634401968",
                                length: 0,
                                mandatory: false,
                                notNullable: false,
                                options: [],
                                defaultValue: "",
                                hidden: false,
                                readOnly: false,
                                unique: false,
                                description: "",
                                placeholder: ""
                            }
                        ]
                    },
                    {
                        id: "column-1740634403810",
                        label: "",
                        name: "",
                        description: "",
                        elements: [
                            {
                                id: "checkbox-1740634406622",
                                sectionId: "section-1",
                                columnId: "column-1740634403810",
                                order: "",
                                type: "checkbox",
                                label: "",
                                name: "checkbox-1740634406622",
                                length: 0,
                                mandatory: false,
                                notNullable: false,
                                options: [],
                                defaultValue: "",
                                hidden: false,
                                readOnly: false,
                                unique: false,
                                description: "",
                                placeholder: ""
                            }
                        ]
                    }
                ]
            }
        ]
    };

    const handleCreate = async () => {
        if (!formName) {
            alert('Please enter a name for the entity.');
            return;
        }

        // // Simpan data JSON ke database
        // await saveJsonToDatabase(formName, navigate);

        await store({data: jsonData});

        // Tutup modal
        closeModal();
    };

    // status
    useEffect(() => {
        if (isSuccessStore) {
            toast.success("Create Successfully")
            navigate(`/builders/${dataStore.data.id}`);
        }
        if (errorStore) {
            const errorData = errorStore as any;
            if (errorData.data.errors) {
                const newErrors: Record<string, string> = {};
                Object.keys(errorData.data.errors).forEach((key) => {
                    newErrors[key] = errorData.data.errors[key][0];
                });
                // setExternalErrors(newErrors);
            }
        }
    }, [isSuccessStore, errorStore])

    return (
        <div>
            <div>
                <label htmlFor="name_entity">Name Entity</label>
                <input
                    id="name_entity"
                    type="text"
                    placeholder="Enter Name Entity"
                    className="form-input"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                />
            </div>
            <div className="flex justify-end items-center mt-8">
                <button type="button" className="btn btn-outline-danger" onClick={closeModal}>
                    Close
                </button>
                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleCreate}>
                    Create
                </button>
            </div>
        </div>
    );
};


// Contoh konten modal 2
export const ModalContent2 = ({ closeModal }: { closeModal: () => void }) => {
    return (
        <div>
            <h3 className="text-lg font-bold mb-4">Custom Modal 2</h3>
            <p>
                This is the content of the second custom modal. You can add any JSX here.
            </p>
            <div className="flex justify-end items-center mt-8">
                <button type="button" className="btn btn-outline-danger" onClick={closeModal}>
                    Close
                </button>
                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={closeModal}>
                    Submit
                </button>
            </div>
        </div>
    );
};

// Tombol kustom
export const CustomButtons = ({ toggleModal }: { toggleModal: (id: string) => void }) => {
    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => toggleModal('modal1')}
            >
                Open Modal 1
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => toggleModal('modal2')}
            >
                Open Modal 2
            </button>
            <Link to={`/create`} className="btn btn-success">
                Create
            </Link>
        </div>
    );
};


// Daftar modal kustom
const modals = [
    {
        id: 'modal1', // ID unik untuk modal
        buttonLabel: 'Open Modal 1', // Label tombol
        title: 'Modal 1 Title', // Judul modal
        content: ModalContent1, // Komponen konten modal
    },
    {
        id: 'modal2',
        buttonLabel: 'Open Modal 2',
        title: 'Modal 2 Title',
        content: ModalContent2,
    },
];

// Export all custom configurations as default
const customConfig = {
    // columns: [
    //     { accessor: 'no', title: 'No', sortable: false, hidden: false },
    //     { accessor: 'name', title: 'Name', sortable: true, hidden: false },
    //     { accessor: 'created_at', title: 'Created At', sortable: true, hidden: false },
    //     { accessor: 'updated_at', title: 'Updated At', sortable: true, hidden: false }
    // ],
    // customRenderRow,
    CustomActions,
    // customFilters,
    // onRowClick
    modals,
    CustomButtons,
};

export default customConfig;