import { configureStore } from '@reduxjs/toolkit'

import userSlice from './user/UserSlice'
import weekScoresSlice from './weekscores/WeekScoresSlice'

import { useDispatch, useSelector } from 'react-redux'
import apiSlice from './api/ApiSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        weekScores: weekScoresSlice,
        api: apiSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()