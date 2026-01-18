import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithErrorHandler } from './config/baseQueryWithErrorHandler'
import type { TourRequest, TourResponse, SearchTourRequest, RegisterPlayerRequest, PlayerResponse, SearchPlayerRequest, ApprovePlayerRequest, TeamResponse, SearchTeamRequest, TeamRequest, AddPlayerRequest } from '@/types/tourTypes'
import type { PageResponse } from '@/types/commonTypes'

// Define a service using a base URL and expected endpoints

const TOUR_PRIVATE_PATH = '/api/private/tours'
export const tourPrivateApi = createApi({
    reducerPath: 'tourPrivateApi',
    baseQuery: baseQueryWithErrorHandler,
    tagTypes: ["Tour", "Tours", "Players", "Teams"],
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
        getPlayers: builder.query<PageResponse<PlayerResponse>, SearchPlayerRequest | void>({
            query: (params) => ({
                url: `${TOUR_PRIVATE_PATH}/players`,
                method: 'GET',
                params: params ?? undefined
            }),
            providesTags: ["Players"],
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
        }),
        approvePlayer: builder.mutation<void, ApprovePlayerRequest>({
            query: (body) => ({
                url: `${TOUR_PRIVATE_PATH}/players/approve`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Tour", "Players"],
        }),
        getTeams: builder.query<PageResponse<TeamResponse>, SearchTeamRequest | void>({
            query: (params) => ({
                url: `${TOUR_PRIVATE_PATH}/teams`,
                method: 'GET',
                params: params ?? undefined
            }),
            providesTags: ["Teams"],
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        createTeam: builder.mutation<void, TeamRequest>({
            query: (body) => ({
                url: `${TOUR_PRIVATE_PATH}/teams`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Teams"],
        }),
        addPlayerToTeam: builder.mutation<void, AddPlayerRequest>({
            query: (body) => ({
                url: `${TOUR_PRIVATE_PATH}/teams/players`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Teams", "Players"],
        }),
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
    useGetPlayersQuery,
    useApprovePlayerMutation,
    useGetTeamsQuery,
    useCreateTeamMutation,
    useAddPlayerToTeamMutation
} = tourPrivateApi

export const {
    useGetPublicToursQuery,
    useRegisterPlayerMutation,
} = tourPublicApi