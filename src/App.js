import React from "react";
import '../src/scss/app.scss';
import Header from "./components/Header";
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage";
import CartPage from "./pages/CartPage"
import {Routes, Route} from "react-router-dom";

export const SearchContext = React.createContext()

function App() {

    const [searchValue, setSearchValue] = React.useState('')

    return (
        <SearchContext.Provider value={{searchValue, setSearchValue}}>
            <div className="wrapper">
                <Header />
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<HomePage />}/>
                            <Route path="/cart" element={<CartPage />}/>
                            <Route path="/*" element={<NotFoundPage />}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </SearchContext.Provider>
    );
}

export default App;
