import * as firebase from 'firebase';
import { OrderDetilActions } from '../actions/order_details_actions';

export const OrderDetailsMiddleware = () => {
    return dispatch => {
     
        firebase.database().ref('order/').on('value', snapshot => {
            snapshot.forEach((messageSnapshot) => {
                let array = [];
                let obj = messageSnapshot.val();
                for (var prop in obj) {
                    array.push(obj[prop]);
                    console.log('array==>', array)
                    dispatch(OrderDetilActions.getorderdetails(array))
                }
            })
        })
    }
}