import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithErrorHandler } from './config/baseQueryWithErrorHandler'
import type { TourRequest, TourResponse, SearchTourRequest, RegisterPlayerRequest, PlayerResponse, SearchPlayerRequest, ApprovePlayerRequest, TeamResponse, SearchTeamRequest, TeamRequest, AddPlayerRequest, TourRoleResponse, PlayerPairResponse, RegisterPlayerPairRequest, SearchPlayerPairRequest, RoundResponse, SearchRoundRequest, RoundRequest, GroupMatchRequest, SearchGroupMatchRequest, GroupMatchResponse } from '@/types/tourTypes'
import type { PageResponse } from '@/types/commonTypes'

// Define a service using a base URL and expected endpoints

const TOUR_PRIVATE_PATH = '/api/private/tours'
export const tourPrivateApi = createApi({
    reducerPath: 'tourPrivateApi',
    baseQuery: baseQueryWithErrorHandler,
    tagTypes: ["Tour", "Tours", "Players", "Teams", "PlayerPairs", "Rounds", "GroupMatches"],
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
        getPlayerPairs: builder.query<PageResponse<PlayerPairResponse>, SearchPlayerPairRequest | void>({
            query: (params) => ({
                url: `${TOUR_PRIVATE_PATH}/player-pairs`,
                method: 'GET',
                params: params ?? undefined
            }),
            providesTags: ["PlayerPairs"],
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        getRounds: builder.query<PageResponse<RoundResponse>, SearchRoundRequest | void>({
            query: (params) => ({
                url: `${TOUR_PRIVATE_PATH}/rounds`,
                method: 'GET',
                params: params ?? undefined
            }),
            providesTags: ["Rounds"],
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        createRound: builder.mutation<void, RoundRequest>({
            query: (body) => ({
                url: `${TOUR_PRIVATE_PATH}/rounds`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Rounds"],
        }),
        getGroupMatches: builder.query<PageResponse<GroupMatchResponse>, SearchGroupMatchRequest | void>({
            query: (params) => ({
                url: `${TOUR_PRIVATE_PATH}/group-matches`,
                method: 'GET',
                params: params ?? undefined
            }),
            providesTags: ["GroupMatches"],
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        createGroupMatch: builder.mutation<void, GroupMatchRequest>({
            query: (body) => ({
                url: `${TOUR_PRIVATE_PATH}/group-matches`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["GroupMatches"],
        }),
    }),
})

const TOUR_PUBLIC_PATH = '/api/public/tours'
export const tourPublicApi = createApi({
    reducerPath: 'tourPublicApi',
    baseQuery: baseQueryWithErrorHandler,
    tagTypes: ["Tours", "Tour", "TourRole", "MyTeam", "TeamPlayers", "TeamPlayerPairs", "TourTeams", "TourPlayers"],
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
            invalidatesTags: ["Tour"],
        }),
        getTourDetailPublic: builder.query<TourResponse, string>({
            query: (tourCode) => ({
                url: `${TOUR_PUBLIC_PATH}/${tourCode}`,
                method: 'GET',
            }),
            providesTags: ["Tour"],
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        getTourRole: builder.query<TourRoleResponse, number>({
            query: (tourId) => ({
                url: `${TOUR_PUBLIC_PATH}/${tourId}/check-role`,
                method: 'GET',
            }),
            providesTags: ["TourRole"],
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        getMyTeam: builder.query<TeamResponse, number>({
            query: (tourId) => ({
                url: `${TOUR_PUBLIC_PATH}/${tourId}/my-team`,
                method: 'GET',
            }),
            providesTags: ["MyTeam"],
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        getTeamPlayers: builder.query<PageResponse<PlayerResponse>, number>({
            query: (teamId) => ({
                url: `${TOUR_PUBLIC_PATH}/teams/${teamId}/players`,
                method: 'GET',
            }),
            providesTags: ["TeamPlayers"],
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        getTeamPairs: builder.query<PageResponse<PlayerPairResponse>, number>({
            query: (teamId) => ({
                url: `${TOUR_PUBLIC_PATH}/teams/${teamId}/player-pairs`,
                method: 'GET',
            }),
            providesTags: ["TeamPlayerPairs"],
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        registerPlayerPair: builder.mutation<void, RegisterPlayerPairRequest>({
            query: (body) => ({
                url: `${TOUR_PUBLIC_PATH}/register/player-pairs`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["TeamPlayerPairs"],
        }),
        deletePlayerPair: builder.mutation<void, number>({
            query: (pairId) => ({
                url: `${TOUR_PUBLIC_PATH}/player-pairs/${pairId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["TeamPlayerPairs"],
        }),
        getTourTeams: builder.query<PageResponse<TeamResponse>, number>({
            query: (tourId) => ({
                url: `${TOUR_PUBLIC_PATH}/${tourId}/teams`,
                method: 'GET',
            }),
            providesTags: ["TourTeams"],
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        getTourPlayers: builder.query<PageResponse<PlayerResponse>, number>({
            query: (tourId) => ({
                url: `${TOUR_PUBLIC_PATH}/${tourId}/players`,
                method: 'GET',
            }),
            providesTags: ["TourPlayers"],
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
    })
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
    useAddPlayerToTeamMutation,
    useGetPlayerPairsQuery,
    useGetRoundsQuery,
    useGetGroupMatchesQuery,
    useCreateRoundMutation,
    useCreateGroupMatchMutation
} = tourPrivateApi

export const {
    useGetPublicToursQuery,
    useRegisterPlayerMutation,
    useGetTourDetailPublicQuery,
    useGetTourRoleQuery,
    useGetMyTeamQuery,
    useGetTeamPlayersQuery,
    useGetTeamPairsQuery,
    useRegisterPlayerPairMutation,
    useDeletePlayerPairMutation,
    useGetTourTeamsQuery,
    useGetTourPlayersQuery
} = tourPublicApi