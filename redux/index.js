import { compose, createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import reducer from './reducer.js';

const composeEnhancer = compose(applyMiddleware(thunk), (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : f => f);

const store = createStore(reducer, composeEnhancer);

export default store;