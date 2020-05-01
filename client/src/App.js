import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NotFound from './components/errors';
import ErrorBoundary from "./components/errors/ErrorBoundary";
import AuthPage from './components/pages/AuthPage';
import MainPage from "./components/pages/MainPage";
import Sellers from "./components/seller/Sellers";
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
                    <Route exact path='/sellers/' component={Sellers}/>
                    {/*<Route exact path='/sellers/' component={SellerPage}/>*/}
                    <Route exact path='/sellers/albums/' component={Albums}/>
                    {/*<Route exact path='/sellers/:userId/albums/' component={Albums}/>*/}
                    <Route exact path='/sellers/:userId/albums/:albumId?' component={Albums}/>
                    <Route exact path='/sellers/albums/photos/' component={Photos}/>
                    <Route exact path='/sellers/:userId/albums/:albumId/photos/:photoId?' component={Photos}/>
                    <Route path='/vk' component={AdminPanel}/>
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
