import { apiSlice } from "../api/apiSlice"

export const testApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // storeData: builder.mutation({
        //     query: ({ data }) => ({
        //         url: `Product`,
        //         method: "POST",
        //         body: data,
        //     }),
        // }),
        getSingleDataBuilder: builder.query({
            query: ({ id }) => ({
                url: `builders/${id}`,
                method: "GET"
            })
        }),
        // updateData: builder.mutation({
        //     query: ({ id, data }) => ({
        //         url: `Product/${id}`,
        //         method: "POST",
        //         body: data,
        //     }),
        // }),
    })
})

export const {
    // useStoreDataMutation,
    useGetSingleDataBuilderQuery,
    // useUpdateDataMutation,
} = testApi  