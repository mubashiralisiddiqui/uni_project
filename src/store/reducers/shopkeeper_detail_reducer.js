import { AuthAction } from '../actions/authAction'
const initialState = {
    sk_detail: [],
    donor: ["hello datta"]
}
const sk_detailReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthAction.SHOPKEEPER_DETAIL: {
            return state = {
                ...state,
                sk_detail: action.payload
            }
        }
        default: { return state; }
    }
}
export default sk_detailReducer;