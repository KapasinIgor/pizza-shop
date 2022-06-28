import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const FullPizza = () => {

    const {id, title, price} = useParams()
    const [pizza, setPizza] = useState()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://629fcd68461f8173e4f117dd.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                alert("Произошлел сбой при запросе пиццы")
                navigate('/')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return "Загрузка..."
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl}/>
            <h2>{pizza.title}</h2>
            <p>здесь описание пиццы подробное</p>
            <h4>цена: {pizza.price}р</h4>
        </div>
    )
}

export default FullPizza



