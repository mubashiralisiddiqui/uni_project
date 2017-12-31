export class AuthAction {
    static LOGIN = "LOGIN"
    static LOGIN_SUCCESS = "LOGIN_SUCCESS"
    static SIGNUP = "SIGNUP";
    static SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
    static LOGOUT = "LOGOUT";
    static SHOPKEEPER_DETAIL = 'SHOPKEEPER_DETAIL'

    static login = (payload) => ({
        type: AuthAction.LOGIN,
        payload
    })

    static login_success = (payload) => ({
        type: AuthAction.LOGIN_SUCCESS,
        payload
    })
    static signup = (payload) => ({
        type: AuthAction.SIGNUP,
        payload
    })

    static signup_success = (payload) => ({
        type: AuthAction.SIGNUP_SUCCESS,
        payload
    })
    static shopkeeperDetail = (payload) =>

        ({
            type: AuthAction.SHOPKEEPER_DETAIL,
            payload
        })

        static logout = (payload) =>
        ({
            type: AuthAction.LOGOUT,
            payload
        })
   
}