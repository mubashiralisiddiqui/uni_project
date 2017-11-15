import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AuthReducers from './reducers/authReducers'
import sk_detailReducer from './reducers/shopkeeper_detail_reducer'
export default createStore(
    combineReducers({
        AuthReducers,
        sk_detailReducer
    }), {}, (applyMiddleware(thunk))
)