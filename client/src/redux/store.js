// Core
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
// Reducers
import rootReducer from './rootReducer';
// Redux sagas
import {rootSaga} from './rootSaga';
// Middleware
import {createLogger} from 'redux-logger';
import {customThunk} from './middleware/log.middleware';

const loggerMiddleware = createLogger({
    duration: true,
    collapsed: true
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, thunkMiddleware, loggerMiddleware, customThunk];

const initialState = {};

export const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

sagaMiddleware.run(rootSaga);
