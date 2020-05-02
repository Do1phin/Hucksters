import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NotFound from './components/errors';
import ErrorBoundary from "./components/errors/ErrorBoundary";
import AuthPage from './components/pages/AuthPage';
import MainPage from "./components/pages/MainPage";
import Sellers from "./components/seller/Sellers";
import SellerPage from "./components/seller/SellerPage";
import Albums from "./components/album/Albums";
import Photos from "./components/photo/Photos";
import Search from "./components/search/Search";
import AdminPanel from './components/admin/AdminPanel';
import Header from './components/header';
import Footer from './components/footer';


import './App.css';


function App() {
    return (
        <ErrorBoundary>
            <Router>
                <Header/>

                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path='/sellers/:user_id?/albums/:album_id?/photos/:photo_id?' component={Photos}/>
                    <Route exact path='/sellers/:user_id?/albums/:album_id?' component={Albums}/>
                    <Route exact path='/sellers/:user_id?' component={Sellers}/>
                    <Route path='/panel' component={AdminPanel}/>
                    <Route path='/signup' action="signup" component={AuthPage}/>
                    <Route path='/signin' action="signin" component={AuthPage}/>
                    <Route path='/search' component={Search}/>
                    <Route component={NotFound}/>
                </Switch>

                <Footer/>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
