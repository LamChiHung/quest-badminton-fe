import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithErrorHandler } from './config/baseQueryWithErrorHandler'
import type { TourRequest, TourResponse, SearchTourRequest } from '@/types/tourTypes'
import type { PageResponse } from '@/types/commonTypes'

// Define a service using a base URL and expected endpoints

const TOUR_PRIVATE_PATH = '/api/private/tours'
export const tourPrivateApi = createApi({
    reducerPath: 'tourPrivateApi',
    baseQuery: baseQueryWithErrorHandler,
    tagTypes: ["Tours"],
    endpoints: (builder) => ({
        getTours: builder.query<PageResponse<TourResponse>, SearchTourRequest | void>({
            query: (params) => ({
                url: `${TOUR_PRIVATE_PATH}`,
                method: 'GET',
                params: params ?? undefined
            }),
            providesTags: ["Tours"],
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        createTour: builder.mutation<void, TourRequest>({
            query: (body) => ({
                url: TOUR_PRIVATE_PATH,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Tours"],
        })
    }),
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetToursQuery,
    useCreateTourMutation,
} = tourPrivateApi