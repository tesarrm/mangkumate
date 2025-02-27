import { apiSlice } from "../api/apiSlice"

export const builderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSingleBuilder: builder.query({
            query: (form_name) => ({
                url: `tablejson/${form_name}`, 
                method: "GET"
            })
        }),
    })
})

export const {
    useGetSingleBuilderQuery,
} = builderApi  