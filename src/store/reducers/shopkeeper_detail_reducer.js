import { AuthAction } from '../actions/authAction'
// const initialState = {
//     sk_detail: []
// }

// export default (state = initialState, action) => {
//     console.log("reducer ", action.payload)
//     switch (action.type) {
//         case AuthAction.SHOPKEEPER_DETAIL:
//             // return { sk_detail: action.payload };
//             return { ...state, sk_detail: action.payload }
//             break;
//         default:
//             return state;
//     }
// }
const initialState = {
    sk_detail: [],
    donor: ["hello datta"]
}
const sk_detailReducer = (state = initialState, action) => {
    console.log("payload reducer", action.payload)
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