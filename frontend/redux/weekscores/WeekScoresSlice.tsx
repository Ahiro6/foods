import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import errorCatch from '../util/errorCatch'

import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"

const droot = 'https://foods-kk5o.onrender.com'
const root = "http://localhost:5000"

const initWeekScores = {
    weekScores: [],
    fruitList: []
}

export const getWeekScores = createAsyncThunk("/weekscores/all/", 
    errorCatch( async (_: any, thunkAPI: any) => {

        const token = await AsyncStorage.getItem('FruitsUserKey');
        
        const headers = {
            'authorization': `Bearer ${token}`
        }

        const res = await axios.get(root + '/weekscore/all/', { headers })

        if (res.data.message) throw new Error(res.data.message)

        return res.data

}))

export const getWeekScore = createAsyncThunk("/weekscores/", 
    errorCatch( async (_: any, thunkAPI: any) => {

        const token = await AsyncStorage.getItem('FruitsUserKey');
        
        const headers = {
            'authorization': `Bearer ${token}`
        }

        const res = await axios.get(root + '/weekscore/', { headers })

        if (res.data.message) throw new Error(res.data.message)

        return res.data

}))

export const startWeekScore = createAsyncThunk("/weekscores/start", 
    errorCatch( async (_: any, thunkAPI: any) => {

        const token = await AsyncStorage.getItem('FruitsUserKey');

        const headers = {
            'authorization': `Bearer ${token}`
        }

        const res = await axios.post(root + '/weekscore/', {}, { headers })

        if (res.data.message) throw new Error(res.data.message)

        return res.data

}))

export const updateWeekScore = createAsyncThunk("/weekscores/update", 
    errorCatch( async ({ name }: any, thunkAPI: any) => {

        const token = await AsyncStorage.getItem('FruitsUserKey');

        console.log(name)

        const headers = {
            'authorization': `Bearer ${token}`
        }

        const res = await axios.put(root + '/weekscore/', {name}, { headers })

        if (res.data.message) throw new Error(res.data.message)

        return res.data

}))

export const weekScoresSlice = createSlice({
    name: 'weekScores',
    initialState: {
        week: initWeekScores,
        isLoading: false,
        isSuccess: false,
        isError: false,
        weekMessage: ''
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder            
            .addCase(getWeekScores.fulfilled, (state: any, action: any) => {
                state.week = { ...action.payload }

                state.isLoading = false
                state.isSuccess = true
                state.weekMessage = ''
            })
            .addCase(getWeekScores.pending, (state: any, action: any) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getWeekScores.rejected, (state: any, action) => {
                state.isError = true,
                state.isLoading = false,
                state.weekMessage = action.payload
            })

            .addCase(getWeekScore.fulfilled, (state: any, action: any) => {
                state.week = { ...action.payload }

                state.isLoading = false
                state.isSuccess = true
                state.weekMessage = ''
            })
            .addCase(getWeekScore.pending, (state: any, action: any) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getWeekScore.rejected, (state: any, action) => {
                state.isError = true,
                state.isLoading = false,
                state.weekMessage = action.payload
            })

            .addCase(startWeekScore.fulfilled, (state: any, action: any) => {
                state.week = { ...action.payload, fruitList: []}

                state.isLoading = false
                state.isSuccess = true
                state.weekMessage = ''
            })
            .addCase(startWeekScore.pending, (state: any, action: any) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(startWeekScore.rejected, (state: any, action) => {
                state.isError = true,
                state.isLoading = false,
                state.weekMessage = action.payload
            })

            .addCase(updateWeekScore.fulfilled, (state: any, action: any) => {
                state.week = { ...action.payload }

                state.isLoading = false
                state.isSuccess = true
                state.weekMessage = ''
            })
            .addCase(updateWeekScore.pending, (state: any, action: any) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(updateWeekScore.rejected, (state: any, action) => {
                state.isError = true,
                state.isLoading = false,
                state.weekMessage = action.payload
            })
    }
})

export const {
    
} = weekScoresSlice.actions

export default weekScoresSlice.reducer