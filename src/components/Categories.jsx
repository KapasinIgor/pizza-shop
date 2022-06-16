import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setActiveCategory} from "../redux/slices/filterSlice";

function Categories() {
    const dispatch = useDispatch()
    const {activeCategory} = useSelector(state => state.filter)

    const categoryList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categoryList.map((categoryName, i) => (
                    <li
                        key={i}
                        onClick={() => dispatch(setActiveCategory(i))}
                        className={activeCategory === i ? 'active' : ''}
                    >
                        {categoryName}
                    </li>))}
            </ul>
        </div>
    )
}

export default Categories