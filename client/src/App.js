// Core
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// Components
import NotFound from './components/errors';
import ErrorBoundary from './components/errors/ErrorBoundary';
import AuthPage from './components/pages/AuthPage';
import MainPage from './components/pages/MainPage';
import MembersContainer from './containers/Members/MembersContainer';
import MemberPage from './components/MemberPage/MemberPage';
import AlbumsContainer from './containers/Albums/AlbumsContainer';
import PhotosContainer from './containers/Photos/PhotosContainer';
import SearchContainer from './containers/Search/SearchContainer';
import AdminPanel from './components/admin/AdminPanel';
import Header from './components/header';
import Footer from './components/footer';
// Styles
import './App.scss';
// import '../src/styles/index.scss';

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <Header/>

                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path='/members/:owner_id?/albums/:album_id?/photos/:photo_id?' component={PhotosContainer}/>
                    <Route exact path='/members/:owner_id?/albums/:album_id?' component={AlbumsContainer}/>
                    <Route exact path='/members/:owner_id?' component={MembersContainer}/>
                    <Route exact path='/members/albums/' component={MembersContainer}/>
                    <Route path='/panel' component={AdminPanel}/>
                    <Route path='/signup' action="signup" component={AuthPage}/>
                    <Route path='/signin' action="signin" component={AuthPage}/>
                    <Route path='/search' component={SearchContainer}/>
                    <Route component={NotFound}/>
                </Switch>

                <Footer/>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
