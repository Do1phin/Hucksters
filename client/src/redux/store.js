import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {customThunk} from './middleware/log.middleware';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './rootSaga';

const loggerMiddleware = createLogger({
    duration: true,
    collapsed: true
});

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const middleware = [sagaMiddleware, thunkMiddleware, loggerMiddleware, customThunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

sagaMiddleware.run(rootSaga);

export default store;
