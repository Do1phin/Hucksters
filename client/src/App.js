import React from 'react';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import AuthPage from './components/pages/AuthPage';
import MainPage from "./components/pages/MainPage";

import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={MainPage}/>
                <Route path='/signup' action="signup" component={AuthPage}/>
                <Route path='/signin' action="signin" component={AuthPage}/>
            </Switch>
        </Router>
    );
}

export default App;
