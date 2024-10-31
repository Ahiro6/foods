import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

import errorCatch from '../util/errorCatch'

import axios from 'axios'

const devRoot = "http://localhost:5000"
const root = 'https://foods-kk5o.onrender.com'

interface User {
    username: string,
    email: string,
    firstname: string,
    surname: string,
    password: string,
    streal: Number,
    dateJoined: Date
}

const initUser = {
    username: '',
    email: '',
    firstname: '',
    surname: '',
    password: '',
    streal: 0,
    dateJoined: Date()
}

export const signup = createAsyncThunk('/user/signup/',

    errorCatch(async ({ username, firstname, surname, email, password, }:
        { username: string, firstname: string, surname: string, email: string, password: string },
        thunkAPI: any) => {


        console.group('User')

        const res = await axios.post(root + '/user/signup',
            { username, firstname, surname, email, password })

        if (res.data.message) throw new Error(res.data.message)

        await AsyncStorage.setItem('FruitsUserKey', JSON.stringify(res.data.token));

        return res.data


    }))

export const login = createAsyncThunk('/user/login/',

    errorCatch(async ({ username, password }: { username: string, password: string }, thunkAPI: any) => {
        const res = await axios.post(root + '/user/login', { username, password })

        if (res.data.message) throw new Error(res.data.message)

        await AsyncStorage.setItem('FruitsUserKey', res.data.token);

        return res.data
    }))

export const logout = createAsyncThunk('/user/logout/',

    errorCatch(async (_: any, thunkAPI: any) => {


        const value = await AsyncStorage.getItem('FruitsUserKey');

        if (value !== null) {
            await AsyncStorage.removeItem('FruitsUserKey')
        }

        return null
    }))

export const getUser = createAsyncThunk('/user/',

    errorCatch(async (_: any, thunkAPI: any) => {

        const token = await AsyncStorage.getItem('FruitsUserKey');

        const headers = {
            'authorization': `Bearer ${token}`
        }

        const res = await axios.get(root + '/user/get/', { headers })

        if (res.data.message) throw new Error(res.data.message)

        return res.data

    }))

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: initUser,
        isLoading: false,
        isSuccess: false,
        isError: false,
        userMessage: ''
    },
    reducers: {
        getDemo: (state) => {
            state.user.username = 'demo'
        },

        setUser: (state, action) => {
            state = action.payload.user
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state: any, action: any) => {
                state.user = action.payload.user

                state.isLoading = false
                state.isSuccess = true
                state.userMessage = ''
            })
            .addCase(login.pending, (state: any, action: any) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(login.rejected, (state: any, action) => {
                state.isError = true,
                state.isLoading = false,
                state.userMessage = action.payload
            })

            .addCase(signup.fulfilled, (state: any, action: any) => {
                state.user = action.payload.user

                state.isLoading = false
                state.isSuccess = true
                state.userMessage = ''
            })
            .addCase(signup.pending, (state: any, action: any) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(signup.rejected, (state: any, action) => {
                state.isError = true,
                state.isLoading = false,
                state.userMessage = action.payload
            })

            .addCase(logout.fulfilled, (state: any, action: any) => {
                state.user = initUser

                state.isLoading = false
                state.isSuccess = true
                state.userMessage = ''
            })
            .addCase(logout.pending, (state: any, action: any) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(logout.rejected, (state: any, action) => {
                state.isError = true,
                state.isLoading = false,
                state.userMessage = action.payload
            })

            .addCase(getUser.fulfilled, (state: any, action: any) => {
                state.user = action.payload.user

                state.isLoading = false
                state.isSuccess = true
                state.userMessage = ''
            })
            .addCase(getUser.pending, (state: any, action: any) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getUser.rejected, (state: any, action) => {
                state.isError = true,
                state.isLoading = false,
                state.userMessage = action.payload
            })

    }
})

export const {
    getDemo
} = userSlice.actions

export default userSlice.reducer