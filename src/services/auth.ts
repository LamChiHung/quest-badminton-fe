import type { ConfirmRegisterRequest, LoginResponse, RegisterRequest } from '@/types/userTypes'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithErrorHandler } from './config/baseQueryWithErrorHandler'

// Define a service using a base URL and expected endpoints

const AUTH_COMMON_PATH = '/api/common/auth'
export const authCommonApi = createApi({
    reducerPath: 'authCommonApi',
    baseQuery: baseQueryWithErrorHandler,
    endpoints: (builder) => ({
        getAuthWelcome: builder.query<LoginResponse, void>({
            query: () => AUTH_COMMON_PATH + '/welcome',
        }),
        register: builder.mutation<void, RegisterRequest>({
            query: (body) => ({
                url: AUTH_COMMON_PATH + '/register',
                method: 'POST',
                body,
            }),
        }),
        confirmRegister: builder.mutation<void, ConfirmRegisterRequest>({
            query: ({ token }) => ({
                url: AUTH_COMMON_PATH + '/register/confirm',
                method: 'POST',
                params: { token },
            }),
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAuthWelcomeQuery,
    useRegisterMutation,
    useConfirmRegisterMutation
} = authCommonApi