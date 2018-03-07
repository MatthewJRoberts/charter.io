import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import userReducer from './store/reducers/user';
import bookingReducer from './store/reducers/booking';
import miscReducer from './store/reducers/misc';
import calendarReducer from './store/reducers/calendar';

const rootReducer = combineReducers({
    user: userReducer,
    booking: bookingReducer,
    misc: miscReducer,
    calendar: calendarReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
