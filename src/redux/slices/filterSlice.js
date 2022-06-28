import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
    activeCategory: 0,
    activeSort: {
        name: 'популярности',
        sortProperty: 'rating'
    },
    sortList: [
        {name: 'популярности(по возрастанию)', sortProperty: 'rating'},
        {name: 'популярности(по убыванию)', sortProperty: '-rating'},
        {name: 'цене(по возрастанию)', sortProperty: 'price'},
        {name: 'цене(по убыванию)', sortProperty: '-price'},
        {name: 'алфавиту(по возрастанию)', sortProperty: 'title'},
        {name: 'алфавиту(по убыванию)', sortProperty: '-title'}
    ]
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue:(state, action) => {
            state.searchValue = action.payload
        },
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload
        },
        setActiveSort: (state, action) => {
            state.activeSort = action.payload
        },
        setFilters: (state, action) => {
            state.activeSort = action.payload.sort
            state.activeCategory = Number(action.payload.activeCategory)
        }
    },
})

export const { setSearchValue, setActiveCategory, setActiveSort, setFilters } = filterSlice.actions

export default filterSlice.reducer