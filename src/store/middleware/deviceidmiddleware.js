import {DeviceIdAction} from '../actions/deviceIdAction';
import * as firebase from 'firebase';


export const deviceIDMiddlware=(deviceid)=>{
    console.log("action",deviceid)
    return dispatch=>{
        dispatch(DeviceIdAction.getdeviceid(deviceid))
    }
}