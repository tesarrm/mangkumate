import { apiSlice } from "./apiSlice";

export const useCrudApi = (resource) => {
    const api = apiSlice.injectEndpoints({
        endpoints: (builder) => ({
            getDatas: builder.query({
                query: ({ 
                    page = 1, 
                    pageSize = 10, 
                    search = "", 
                    sort = "created_at", 
                    direction = "desc", 
                    filterColumn = "", 
                    filterValue = "" 
                }) => {
                    let url = `${resource}?page=${page}&row=${pageSize}&search=${search}&sort=${sort}&direction=${direction}`;
                    if (filterColumn && filterValue) {
                        url += `&${filterColumn}=${filterValue}`;
                    }
                    return { url, method: "GET" };
                },
            }),
            getDatasExport: builder.query({
                query: ({ 
                    page = 1, 
                    pageSize = 10, 
                    search = "", 
                    sort = "created_at", 
                    direction = "desc", 
                    filterColumn = "", 
                    filterValue = "" 
                }) => {
                    let url = `${resource}-export?page=${page}&row=${pageSize}&search=${search}&sort=${sort}&direction=${direction}`;
                    if (filterColumn && filterValue) {
                        url += `&${filterColumn}=${filterValue}`;
                    }
                    return { url, method: "GET" };
                },
            }),
            getSingleData: builder.query({
                query: ({ id }) => ({
                    url: `${resource}/${id}`,
                    method: "GET"
                })
            }),
            updateData: builder.mutation({
                query: ({ id, data }) => ({
                    url: `${resource}/${id}`,
                    method: "POST",
                    body: data,
                }),
            }),
            storeData: builder.mutation({
                query: ({ data }) => ({
                    url: `${resource}`,
                    method: "POST",
                    body: data,
                }),
            }),
            importData: builder.mutation({
                query: ({ data }) => ({
                    url: `${resource}-import`,
                    method: "POST",
                    body: data,
                }),
            }),
            importUpdateData: builder.mutation({
                query: ({ data }) => ({
                    url: `${resource}-import-update`,
                    method: "POST",
                    body: data,
                }),
            }),
            deleteData: builder.mutation({
                query: (id) => ({
                    url: `${resource}/${id}`,
                    method: "DELETE",
                })
            }),
        })
    });

    return {
        useGetDatasQuery: api.useGetDatasQuery,
        useLazyGetExportDatasQuery: api.useLazyGetDatasExportQuery,
        useGetSingleDataQuery: api.useGetSingleDataQuery,
        useStoreDataMutation: api.useStoreDataMutation,
        useImportDataMutation: api.useImportDataMutation,
        useImportUpdateDataMutation: api.useImportUpdateDataMutation,
        useUpdateDataMutation: api.useUpdateDataMutation,
        useDeleteDataMutation: api.useDeleteDataMutation,
    };
};
