import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {SearchContext} from "../App";
import {useSelector, useDispatch} from "react-redux";
import {setFilters} from "../redux/slices/filterSlice"
import {fetchPizzas} from "../redux/slices/pizzaSlice";
import {useNavigate} from 'react-router-dom'
import qs from 'qs'


function HomePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isMounted = React.useRef(false)
    const isSearch = React.useRef(false)
    const {items, status} = useSelector(state => state.pizza)
    const {activeCategory, activeSort, sortList} = useSelector(state => state.filter)
    const {searchValue} = React.useContext(SearchContext)

    const getPizzas = async () => {

        const sortBy = activeSort.sortProperty.replace('-', '')
        const order = activeSort.sortProperty.includes('-') ? 'desc' : 'ask'
        const category = activeCategory > 0 ? `category=${activeCategory}` : ''
        const search = searchValue ? `&search=${searchValue}` : '' //поиск работает если не выбрана категория - особенность mockApi, на нормальном бэке будет норм.

        dispatch(fetchPizzas({
            sortBy,
            order,
            category,
            search
        }))
        window.scrollTo(0, 0)
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
            getPizzas()
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
            {
                status === 'error' ? (
                    <div>
                        <h2>Пиццы отсутствуют <icon>😕</icon></h2>
                        <p>
                            Произошла ошибка при получении пицц с сервера. Проверьте соединение с интернетом.
                        </p>
                    </div>
                ) : (
                    <div className="content__items">
                        {status === 'loading' ? skeletons : pizzas}
                    </div>
                )
            }
        </>
    )
}

export default HomePage