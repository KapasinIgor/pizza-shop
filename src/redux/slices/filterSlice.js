import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeCategory: 0,
    activeSort: {
        name: 'популярности',
        sortProp: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload
        },
        setActiveSort: (state, action) => {
            state.activeSort = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setActiveCategory, setActiveSort } = filterSlice.actions

export default filterSlice.reducer