import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params, thunkAPI) => {
        const {sortBy, order, category, search} = params
        const res = await axios.get(`https://629fcd68461f8173e4f117dd.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
        return res.data
    }
)

const initialState = {
    items: [],
    status: '' // loading | success | error
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        }
    }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer