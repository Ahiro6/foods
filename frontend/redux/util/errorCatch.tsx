
const errorCatch = (fn: any) => {



    return async (data: any, thunkAPI: any) => {

        try {
            const response = await fn(data, thunkAPI)          

            return response
        }

        catch (error: any) {
            
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
                
            console.log(message, error)
            return thunkAPI.rejectWithValue(message)
        }


    }
}

export default errorCatch