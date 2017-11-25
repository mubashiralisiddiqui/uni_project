import * as firebase from 'firebase'

export class OrderDetilActions {

    static GETORDERDETAILS = 'GETORDERDETAILS';

    static getorderdetails = (payload) => {
        type: OrderDetilActions.GETORDERDETAILS,
            payload
    }

}