import React from "react";
import '../src/scss/app.scss';
import Header from "./components/Header";
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage";
import CartPage from "./pages/CartPage"
import {Routes, Route} from "react-router-dom";
import FullPizza from "./pages/FullPizza";

export const SearchContext = React.createContext()

function App() {

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<HomePage />}/>
                        <Route path="/cart" element={<CartPage />}/>
                        <Route path="/pizza/:id" element={<FullPizza />}/>
                        <Route path="/*" element={<NotFoundPage />}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
