import React, { useCallback, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DataTable } from 'mantine-datatable';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../Dropdown';
import { deleteConfirmation, entityUrl, formatDate } from '../tools';
import Breadcrumb from "../Breadcumb";
import ExportModal from "./Export/ExportModal";
import IconPlus from "../Icon/IconPlus";
import { useCrudApi } from "../../redux/api/useCrudApi";

// Helper untuk localStorage
const getLocalStorage = (key: string, defaultValue: any) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
};

const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

interface Column {
    accessor: string;
    title: string;
    sortable?: boolean;
    hidden?: boolean;
    render?: (record: any) => React.ReactNode;
}

interface ListProps {
    entity?: string;
    columns: Column[];
    customRenderRow?: (record: any) => React.ReactNode;
    customActions?: React.ReactNode;
    customFilters?: React.ReactNode;
    onRowClick?: (record: any) => void;
    fetchData?: (params: any) => Promise<any>;
}

const List: React.FC<ListProps> = ({ 
    entity = entityUrl(), 
    columns, 
    customRenderRow,
    customActions,
    customFilters,
    onRowClick,
    fetchData,
}) => {
    const navigate = useNavigate();
    const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
    const { 
        useGetDatasQuery, 
        useLazyGetExportDatasQuery, 
        useDeleteDataMutation,
    } = useCrudApi(entity);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const entityKeys = {
        cols: `${entity}_cols`,
        page: `${entity}_page`,
        pageSize: `${entity}_page_size`,
        sort: `${entity}_sort`,
        search: `${entity}_search`,
        filterColumn: `${entity}_filter_column`,
        filterValue: `${entity}_filter_value`
    };

    // State
    const [page, setPage] = useState(() => getLocalStorage(entityKeys.page, 1));
    const [search, setSearch] = useState(() => getLocalStorage(entityKeys.search, ""));
    const [sortStatus, setSortStatus] = useState(() => getLocalStorage(entityKeys.sort, { columnAccessor: "created_at", direction: "desc" }));
    const [selectedColumn, setSelectedColumn] = useState(() => getLocalStorage(entityKeys.filterColumn, ""));
    const [filterValue, setFilterValue] = useState(() => getLocalStorage(entityKeys.filterValue, ""));
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(() => getLocalStorage(entityKeys.pageSize, 10));
    const [items, setItems] = useState<any[]>([]);
    const [total, setTotal] = useState<number | undefined>();
    const [hideCols, setHideCols] = useState<string[]>(() => getLocalStorage(entityKeys.cols, []));
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

    // data query 
    const { data, refetch } = useGetDatasQuery(
        { 
            page, 
            pageSize,
            search,
            sort: sortStatus.columnAccessor,
            direction: sortStatus.direction,
            filterColumn: selectedColumn,  
            filterValue: filterValue    
        },
        { refetchOnMountOrArgChange: true } 
    );
    const [deleteData] = useDeleteDataMutation();

    // Sync dengan localStorage
    useEffect(() => setLocalStorage(entityKeys.search, search), [search]);
    useEffect(() => setLocalStorage(entityKeys.filterColumn, selectedColumn), [selectedColumn]);
    useEffect(() => setLocalStorage(entityKeys.filterValue, filterValue), [filterValue]);
    useEffect(() => setLocalStorage(entityKeys.sort, sortStatus), [sortStatus]);
    useEffect(() => setLocalStorage(entityKeys.page, page), [page]);
    useEffect(() => setLocalStorage(entityKeys.pageSize, pageSize), [pageSize]);
    useEffect(() => setLocalStorage(entityKeys.cols, hideCols), [hideCols]);

    // Load data ke state
    useEffect(() => {
        if (data?.data) {
            setItems(data.data.map((d: any, index: number) => ({
                ...d,
                id: d.id,
                no: index + 1 + (page - 1) * pageSize,
                photo: d.photo ? `${import.meta.env.VITE_SERVER_URI_BASE}storage/${d.photo}` : '/assets/images/blank_profile.png',
                created_at: formatDate(d.created_at),
            })));
            setTotal(data.total);
        }
    }, [data, page, pageSize]);

    // Tampilkan/sembunyikan kolom
    const toggleColumnVisibility = useCallback((col: string) => {
        setHideCols(prev => {
            const updated = prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col];
            setLocalStorage(entityKeys.cols, updated);
            return updated;
        });
    }, [entityKeys.cols]);

    // Hapus baris
    const deleteRow = useCallback(() => {
        deleteConfirmation(selectedRecords, deleteData, refetch);
    }, [selectedRecords, refetch]);

    // is scroll
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20); // Aktif jika scroll lebih dari 20px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // modal 
    const [modal, setModal] = useState(false);

    return (
        <div>
            <div className={`sticky top-14 z-10 flex items-center justify-between flex-wrap gap-4 mb-5 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm mx-[-1.50rem] px-6 py-4" : ""}`}>
                <Breadcrumb/>

                <div className="flex flex-row items-center gap-3 w-auto">
                    {customActions || (
                        <div className="flex items-center gap-2">
                            <Link to={`/${entity}/import`} className="btn btn-warning gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.5" d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" 
                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" 
                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="hidden sm:inline">Import</span>
                            </Link>
                            <Link to={`/${entity}/create`} className="btn btn-primary gap-2">
                                <IconPlus />
                                <span className="hidden sm:inline">Create</span>
                            </Link>
                        </div>
                    )}
                </div>

                <ExportModal 
                    modal={modal}
                    setModal={setModal}
                    entity={entity}
                    page={page}
                    pageSize={pageSize}
                    search={search}
                    sortStatus={sortStatus}
                    useLazyGetExportDataQuery={useLazyGetExportDatasQuery}
                    selectedColumn={selectedColumn}
                    filterValue={filterValue}
                    columns={columns}
                    hideCols={hideCols}
                    selectedRecords={selectedRecords}
                />
            </div>

            <div className="panel border-white-light dark:border-[#1b2e4b]">
                <div className="invoice-table">
                    {/* action table */}
                    <div className="mb-4.5 grid grid-cols-1 sm:grid-cols-8 gap-5">
                        {customFilters || (
                            <div className="sm:col-span-5 md:col-span-6 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
                                {/* show hidde column */}
                                <div className="dropdown">
                                    <Dropdown
                                        placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                        btnClassName="!flex items-center justify-between w-full border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                        button={
                                            <>
                                                <span className="ltr:mr-1 rtl:ml-1 whitespace-nowrap">Show Fields</span>
                                                <span>
                                                    <svg className="w-4 h-4 ltr:ml-1 rtl:mr-1 inline-block" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            </>
                                        }
                                    >
                                        <ul className="!min-w-max">
                                            {columns
                                                .filter(col => col.hidden == false) 
                                                .map((col, i) => {
                                                return (
                                                    <li
                                                        key={i}
                                                        className="flex flex-col"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                        }}
                                                    >
                                                        <div className="flex items-center px-4 py-1">
                                                            <label className="cursor-pointer mb-0">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={!hideCols.includes(col.accessor)}
                                                                    className="form-checkbox"
                                                                    onChange={() => toggleColumnVisibility(col.accessor)}
                                                                />
                                                                <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </Dropdown>
                                </div>

                                {/* Dropdown Pilih Kolom + Input Filter */}
                                <select 
                                    value={selectedColumn} 
                                    onChange={(e) => setSelectedColumn(e.target.value)}
                                    className="form-select"
                                >
                                    <option value="">Column Filter</option>
                                    {columns
                                        .filter(col => col.accessor !== "no" && col.hidden == false) 
                                        .map(col => (
                                            <option key={col.accessor} value={col.accessor}>{col.title}</option>
                                        ))
                                    }
                                </select>

                                {/* search */}
                                <input 
                                    type="text"
                                    value={filterValue}
                                    onChange={(e) => setFilterValue(e.target.value)}
                                    placeholder="Value filter"
                                    className="form-input"
                                />
                            </div>
                        )}

                        <div className="sm:col-span-3 md:col-span-2">
                            {/* search */}
                            <input type="text" className="form-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>

                    {/* table */}
                    <div className="datatables pagination-padding">
                        <DataTable
                            className="whitespace-nowrap table-hover invoice-table"
                            records={items}
                            columns={columns.map(({ accessor, title, hidden, sortable, render }) => ({
                                accessor,
                                title: title,
                                hidden: hidden || hideCols.includes(accessor),
                                sortable: sortable !== false,
                                render: render || customRenderRow
                            }))}
                            highlightOnHover
                            totalRecords={total}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={setPage}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            sortStatus={sortStatus}
                            onSortStatusChange={setSortStatus}
                            selectedRecords={selectedRecords}
                            onSelectedRecordsChange={setSelectedRecords}
                            paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                            onRowClick={onRowClick || ((record) => {
                                if (clickTimeout) {
                                    clearTimeout(clickTimeout);
                                    setClickTimeout(null);
                                    navigate(`/${entity}/${record.id}`); // Navigasi ke halaman edit jika double-click
                                } else {
                                    const timeout = setTimeout(() => {
                                        setClickTimeout(null);
                                        console.log("Single Click - Tidak melakukan navigasi");
                                    }, 300); // Atur delay untuk membedakan single & double click
                                    setClickTimeout(timeout);
                                }
                            })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;