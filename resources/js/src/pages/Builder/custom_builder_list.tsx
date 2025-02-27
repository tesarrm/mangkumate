import React from 'react';
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
export const customActions = (
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
        <Link to={`/create`} className="btn btn-primary gap-2">
            <IconPlus />
            <span className="hidden sm:inline">Create</span>
        </Link>
    </div>
);

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

// Export all custom configurations as default
const customConfig = {
    // columns: [
    //     { accessor: 'no', title: 'No', sortable: false, hidden: false },
    //     { accessor: 'name', title: 'Name', sortable: true, hidden: false },
    //     { accessor: 'created_at', title: 'Created At', sortable: true, hidden: false },
    //     { accessor: 'updated_at', title: 'Updated At', sortable: true, hidden: false }
    // ],
    // customRenderRow,
    customActions,
    // customFilters,
    // onRowClick
};

export default customConfig;