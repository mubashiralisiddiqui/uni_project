import { OrderDetilActions } from '../actions/order_details_actions';


const initialState = {
    orderDetails: []
}

const OrderDetailReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case OrderDetilActions.GETORDERDETAILS: {
            return {
                ...state, orderDetails: actions.payload
            }
        }
        default: {
            return state
        }
    }

}
export default OrderDetailReducer;