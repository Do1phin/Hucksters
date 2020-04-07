import React from 'react';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import AuthPage from './components/pages/AuthPage';
import MainPage from "./components/pages/MainPage";
import SellersPage from "./components/pages/SellersPage";
import Header from './components/header';

import './App.css';


function App() {
    return (

        <Router>
            <Header/>
            <Switch>
                <Route path='/' exact component={MainPage}/>
                <Route path='/sellers' component={SellersPage}/>
                <Route path='/signup' action="signup" component={AuthPage}/>
                <Route path='/signin' action="signin" component={AuthPage}/>
            </Switch>
        </Router>
    );
}

export default App;
