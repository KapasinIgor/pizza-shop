import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalPrice: 0,
    totalPizzas: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({...action.payload, count: 1})
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
            state.totalPizzas = state.items.reduce((sum, obj) => {return obj.count + sum}, 0)
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        clearCart: (state) => {
            state.items = []
        },
    },
})

export const { addItem, deleteItem, clearCart } = cartSlice.actions

export default cartSlice.reducer