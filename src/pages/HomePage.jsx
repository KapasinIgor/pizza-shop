import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {SearchContext} from "../App";
import {useSelector, useDispatch} from "react-redux";
import {setItems} from "../redux/slices/pizzaSlice";


function HomePage() {

    const dispatch = useDispatch()
    const {activeCategory, activeSort} = useSelector(state => state.filter)
    const items = useSelector(state => state.pizza.items)

    const {searchValue} = React.useContext(SearchContext)
    const [isLoading, setIsLoading] = React.useState(true)


    React.useEffect(() => {
        setIsLoading(true)

        const sortBy = activeSort.sortProp.replace('-', '')
        const order = activeSort.sortProp.includes('-') ? 'desc' : 'ask'
        const category = activeCategory > 0 ? `category=${activeCategory}` : ''
        const search = searchValue ? `&search=${searchValue}` : '' //поиск работает если не выбрана категория - особенность mockApi, на нормальном бэке будет норм.

        fetch(`https://629fcd68461f8173e4f117dd.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => res.json())
            .then((arr) => {
                dispatch(setItems(arr))
                setIsLoading(false)
            })
        window.scrollTo(0, 0) // что бы при переходе на главную отображался верх страницы
    }, [activeCategory, activeSort.sortProp, searchValue])

    // Для поиска статичных элементов без помощи бекэнда
    // const pizzas = items.filter((obj) => {
    //     return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    // })
    //     .map((obj) => <PizzaBlock key={obj.id} {...obj} />)

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
        </>
    )
}

export default HomePage