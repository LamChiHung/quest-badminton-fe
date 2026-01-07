import type { ApiError } from "@/types/errorTypes"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { toast } from "sonner"

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("access_token")
        if (token) headers.set("Authorization", `Bearer ${token}`)
        return headers
    },
    credentials: "include",
})


export const baseQueryWithErrorHandler: typeof baseQuery = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result.error) {
        const err = result.error as ApiError
        if (err.status === 401) {
            localStorage.removeItem("access_token")
            toast.error(err.data.errorMessage)
            // api.dispatch(logout())
        } else {
            toast.error(err.data.errorMessage)
        }
    }

    return result
}