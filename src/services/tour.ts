import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithErrorHandler } from './config/baseQueryWithErrorHandler'
import type { TourRequest, TourResponse, SearchTourRequest, RegisterPlayerRequest } from '@/types/tourTypes'
import type { PageResponse } from '@/types/commonTypes'

// Define a service using a base URL and expected endpoints

const TOUR_PRIVATE_PATH = '/api/private/tours'
export const tourPrivateApi = createApi({
    reducerPath: 'tourPrivateApi',
    baseQuery: baseQueryWithErrorHandler,
    tagTypes: ["Tour","Tours"],
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
         getTourDetail: builder.query<TourResponse, number>({
            query: (id) => ({
                url: `${TOUR_PRIVATE_PATH}/${id}`,
                method: 'GET',
            }),
            providesTags: ["Tour"],
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

const TOUR_PUBLIC_PATH = '/api/public/tours'
export const tourPublicApi = createApi({
    reducerPath: 'tourPublicApi',
    baseQuery: baseQueryWithErrorHandler,
    tagTypes: ["Tours"],
    endpoints: (builder) => ({
        getPublicTours: builder.query<PageResponse<TourResponse>, SearchTourRequest | void>({
            query: (params) => ({
                url: `${TOUR_PUBLIC_PATH}`,
                method: 'GET',
                params: params ?? undefined
            }),
            providesTags: ["Tours"],
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        registerPlayer: builder.mutation<void, RegisterPlayerRequest>({
            query: (body) => ({
                url: `${TOUR_PUBLIC_PATH}/register/players`,
                method: 'POST',
                body,
            }),
        })
    }),
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetToursQuery,
    useGetTourDetailQuery,
    useCreateTourMutation,
} = tourPrivateApi

export const {
    useGetPublicToursQuery,
    useRegisterPlayerMutation,
} = tourPublicApi