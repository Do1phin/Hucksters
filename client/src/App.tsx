// Core
import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// React components
import NotFound from './components/errors';
import ErrorBoundary from './components/errors/ErrorBoundary';
import AuthPage from './containers/AuthPage/AuthPage';
import HomePage from './containers/HomePage/HomePage';
import MembersContainer from './containers/Members/MembersContainer';
import AlbumsContainer from './containers/Albums/AlbumsContainer';
import PhotosContainer from './containers/Photos/PhotosContainer';
import SearchContainer from './containers/Search/SearchContainer';
import AdminPanelContainer from './containers/AdminPanel/AdminPanelContainer';
import Header from './components/header';
import Footer from './components/footer';
// Styles
import './App.scss';

export const App: FC = () => {
    return (
        <ErrorBoundary>
            <Router>
                <Header/>

                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/members/:owner_id?/albums/:album_id?/photos/:photo_id?' component={PhotosContainer}/>
                    <Route exact path='/members/:owner_id?/albums/:album_id?' component={AlbumsContainer}/>
                    <Route exact path='/members/:owner_id?' component={MembersContainer}/>
                    <Route exact path='/members/albums/' component={MembersContainer}/>
                    <Route path='/panel' component={AdminPanelContainer}/>
                    <Route path='/signup' action="signup" component={AuthPage}/>
                    <Route path='/signin' action="signin" component={AuthPage}/>
                    <Route path='/search' component={SearchContainer}/>
                    <Route component={NotFound}/>
                </Switch>

                <Footer/>
            </Router>
        </ErrorBoundary>
    );
};
