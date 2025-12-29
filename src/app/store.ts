import counterReducer from '../features/counter/counterSlice'
import meReducer from '../features/user/meSlice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authCommonApi, authPublicApi } from '@/services/auth'


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        me: meReducer,
        [authCommonApi.reducerPath]: authCommonApi.reducer,
        [authPublicApi.reducerPath]: authPublicApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authCommonApi.middleware)
        .concat(authPublicApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)