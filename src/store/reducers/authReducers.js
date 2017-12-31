import { AuthAction } from '../actions/authAction'


export default function (state = { isLoggedIn: false, detail: {} }, action) {
    switch (action.type) {

        case AuthAction.LOGIN_SUCCESS:
            return { isLoggedIn: true };
            break;
        case AuthAction.SHOPKEEPER_DETAIL:
            return { detail: action.payload }
            break;
        case AuthAction.LOGOUT:
            return {
                isLoggedIn: false
            }
        default:
            return state;
    }
}