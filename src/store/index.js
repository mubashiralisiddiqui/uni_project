import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AuthReducers from './reducers/authReducers'
import sk_detailReducer from './reducers/shopkeeper_detail_reducer';
import OrderDetailReducer from './reducers/orderDetailsReducer';
import deviceIDReducer from './reducers/deviceIdReducer';
import navReducer from './reducers/navReducers'
export default createStore(
    combineReducers({
        AuthReducers,
        sk_detailReducer,
        OrderDetailReducer,
        deviceIDReducer,
        navReducer
    }), {}, (applyMiddleware(thunk))
)