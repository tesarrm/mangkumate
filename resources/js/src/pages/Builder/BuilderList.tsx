import React, { Fragment, useEffect, useState } from 'react';
import List from '../../components/Entity/List';
import { Dialog, Transition } from '@headlessui/react';

// Default columns and configuration
const defaultColumns = [
    { accessor: 'no', title: 'No', sortable: false, hidden: false },
    { accessor: 'id', title: 'Entity Name', sortable: true, hidden: false },
    { accessor: 'created_at', title: 'Created At', sortable: true, hidden: false },
    { accessor: 'updated_at', title: 'Updated At', sortable: true, hidden: false }
];

const BuilderList = () => {
    const [customConfig, setCustomConfig] = useState<any>({});
    const [modals, setModals] = useState<{ [key: string]: boolean }>({}); // State untuk banyak modal

    // Load custom configurations dynamically
    useEffect(() => {
        const loadCustomConfig = async () => {
            try {
                const config = await import('./custom_builder_list');
                setCustomConfig(config.default);
                // Inisialisasi state modal berdasarkan konfigurasi kustom
                const initialModals: { [key: string]: boolean } = {};
                if (config.default.modals) {
                    config.default.modals.forEach((modal: any) => {
                        initialModals[modal.id] = false;
                    });
                }
                setModals(initialModals);
            } catch (error) {
                console.log('No custom configuration found, using default settings.');
            }
        };

        loadCustomConfig();
    }, []);

    // Fungsi untuk membuka dan menutup modal
    const toggleModal = (id: string) => {
        setModals((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Use custom configurations if available, otherwise use defaults
    const columns = customConfig.columns || defaultColumns;
    const customRenderRow = customConfig.customRenderRow;
    const CustomActions = customConfig.CustomActions;
    const customFilters = customConfig.customFilters;
    const onRowClick = customConfig.onRowClick;
    const customModals = customConfig.modals || []; // Daftar modal kustom
    const CustomButtons = customConfig.CustomButtons; // Tombol kustom dari custom_builder_list

    return (
        <div>
            {/* Tombol kustom */}
            <div className="mb-5 flex items-center justify-center gap-2">
                {CustomButtons && <CustomButtons toggleModal={toggleModal} />}
            </div>

            {/* Render modal kustom */}
            {customModals.map((modal: any) => (
                <Transition key={modal.id} appear show={modals[modal.id]} as={Fragment}>
                    <Dialog as="div" open={modals[modal.id]} onClose={() => toggleModal(modal.id)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/30" />
                        </Transition.Child>
                        <div className="fixed inset-0 z-[999] overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                            <div className="text-lg font-bold">{modal.title}</div>
                                            <button type="button" className="text-white-dark hover:text-dark" onClick={() => toggleModal(modal.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            {/* Render konten modal kustom */}
                                            <modal.content closeModal={() => toggleModal(modal.id)} />
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            ))}

            {/* Komponen List */}
            <List
                columns={columns}
                customRenderRow={customRenderRow}
                CustomActions={CustomActions}
                customFilters={customFilters}
                onRowClick={onRowClick}
                toggleModal={toggleModal}
            />
        </div>
    );
};

export default BuilderList;