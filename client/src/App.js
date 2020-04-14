import React from 'react';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import NotFound from './components/errors';
import AuthPage from './components/pages/AuthPage';
import MainPage from "./components/pages/MainPage";
import Sellers from "./components/seller/Sellers";
import Albums from "./components/album/Albums";
import Photos from "./components/photo/Photos";
import VkPage from "./components/pages/VkPage";
// import VkAdmin from './components/admin/Vk';
import Header from './components/header';

import './App.css';


function App() {
    return (

        <Router>
            <Header/>
            <Switch>
                <Route exact path='/' component={MainPage}/>
                <Route exact path='/sellers' component={Sellers}/>
                <Route exact path='/sellers/albums' component={Albums}/>
                <Route exact path='/sellers/albums/photos' component={Photos}/>
                <Route path='/vk' component={VkPage}/>
                {/*<Route path='/vk' component={VkAdmin}/>*/}
                <Route path='/signup' action="signup" component={AuthPage}/>
                <Route path='/signin' action="signin" component={AuthPage}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
}

export default App;
