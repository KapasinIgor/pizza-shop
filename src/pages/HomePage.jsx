import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {SearchContext} from "../App";
import {useSelector, useDispatch} from "react-redux";
import {setItems} from "../redux/slices/pizzaSlice";
import {setFilters} from "../redux/slices/filterSlice"
import axios from 'axios'
import qs from 'qs'
import {useNavigate} from 'react-router-dom'


function HomePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {activeCategory, activeSort, sortList} = useSelector(state => state.filter)
    const items = useSelector(state => state.pizza.items)
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    const {searchValue} = React.useContext(SearchContext)
    const [isLoading, setIsLoading] = React.useState(true)

    const fetchPizzas = () => {
        setIsLoading(true)

        const sortBy = activeSort.sortProperty.replace('-', '')
        const order = activeSort.sortProperty.includes('-') ? 'desc' : 'ask'
        const category = activeCategory > 0 ? `category=${activeCategory}` : ''
        const search = searchValue ? `&search=${searchValue}` : '' //поиск работает если не выбрана категория - особенность mockApi, на нормальном бэке будет норм.

        axios
            .get(`https://629fcd68461f8173e4f117dd.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => {
                dispatch(setItems(res.data))
                setIsLoading(false)
            })
    }

    // Если был первый рендер, то проверяем url-параметры и сохраняем в редаксе
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)
            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            )
            isSearch.current = true
        }
    }, [])

    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false
    }, [activeCategory, activeSort.sortProperty, searchValue])

    // Если был уже ранее рендер, то тогда проверяй нужно ли вшивать эти параметры в адресную строку
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: activeSort.sortProperty,
                activeCategory
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [activeCategory, activeSort.sortProperty])



    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
        </>
    )
}

export default HomePage