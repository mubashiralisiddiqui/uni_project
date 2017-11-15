import { AuthAction } from '../actions/authAction'


export default function (state = { isLoggedIn: false, detail: {} }, action) {
    console.log('authreducer', action.payload)
    switch (action.type) {

        case AuthAction.LOGIN_SUCCESS:
            return { isLoggedIn: true };
            break;
        case AuthAction.SHOPKEEPER_DETAIL:
            return { detail: action.payload }
            break;
        default:
            return state;
    }
}