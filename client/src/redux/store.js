import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {customThunk} from './middleware/log.middleware';

const loggerMiddleware = createLogger({
    duration: true,
    collapsed: true
});
const initialState = {};

const middleware = [thunkMiddleware, loggerMiddleware, customThunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
