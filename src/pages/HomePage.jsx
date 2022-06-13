import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {SearchContext} from "../App";

function HomePage() {

    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [activeCategory, setActiveCategory] = React.useState(0)
    const [activeSort, setActiveSort] = React.useState({
        name: 'популярности',
        sortProp: 'rating'
    })

    React.useEffect(() => {
        setIsLoading(true)

        const sortBy = activeSort.sortProp.replace('-', '')
        const order = activeSort.sortProp.includes('-') ? 'desc' : 'ask'
        const category = activeCategory > 0 ? `category=${activeCategory}` : ''
        const search = searchValue ? `&search=${searchValue}` : '' //поиск работает если не выбрана категория - особенность mockApi, на нормальном бэке будет норм.

        fetch(`https://629fcd68461f8173e4f117dd.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0) // что бы при переходе на главную отображался верх страницы
    }, [activeCategory, activeSort, searchValue])

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
                <Categories value={activeCategory} onChangeCategory={(i) => setActiveCategory(i)}/>
                <Sort value={activeSort} onChangeSort={(i) => setActiveSort(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
        </>
    )
}

export default HomePage