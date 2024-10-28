import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import errorCatch from "../util/errorCatch";
import axios from "axios";

const root = "http://localhost:5000"

export const getPlants = createAsyncThunk('/plant/',

    errorCatch(async ({ plant }: {plant: string}, thunkAPI: any) => {

        const res = await axios.get(`${root}/api/plants/${plant}`)

        if (res.data.message) throw new Error(res.data.message)

        return res.data

    }))

export const apiSlice = createSlice({
    name: 'api',
    initialState: {
        plant: '',
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: ''
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getPlants.fulfilled, (state: any, action: any) => {
                state.plant = action.payload.plant

                state.isLoading = false
                state.isSuccess = true
                state.message = ''
            })
            .addCase(getPlants.pending, (state: any, action: any) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getPlants.rejected, (state: any, action) => {
                state.isError = true,
                state.isLoading = false,
                state.message = action.payload
            })
    }
})

export default apiSlice.reducer