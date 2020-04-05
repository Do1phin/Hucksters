import React from 'react';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import SignupPage from './components/pages/SignupPage';
import './App.css';
import MainPage from "./components/pages/MainPage";

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={MainPage}/>
                <Route path='/signup' action="signup" component={SignupPage}/>
            </Switch>
        </Router>
    );
}

export default App;
