import { DeviceIdAction } from '../actions/deviceIdAction';
import * as firebase from 'firebase';


export const deviceIDMiddlware = (deviceid) => {
    return dispatch => {
        dispatch(DeviceIdAction.getdeviceid(deviceid))
        firebase.database().ref('users/').on('value', data => {
            let obj = data.val();
            let array = [];
            for (var prop in obj) {
                array.push(obj[prop])
            }
            array.map((d, i) => {
                dispatch(DeviceIdAction.getAllUserId(d.deviceId))
            })
        })
    }
}