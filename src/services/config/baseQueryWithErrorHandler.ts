import type { ApiError } from "@/types/errorTypes"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { toast } from "sonner"

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token")
        if (token) headers.set("Authorization", `Bearer ${token}`)
        return headers
    },
})


export const baseQueryWithErrorHandler: typeof baseQuery = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result.error) {
        const err = result.error as ApiError
        if (err.status === 401) {
            toast.error("Phiên đăng nhập hết hạn")
            // api.dispatch(logout())
        } else {
            toast.error(err.data.errorMessage)
        }
    }

    return result
}