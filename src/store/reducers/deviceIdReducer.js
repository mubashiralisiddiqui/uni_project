
import { DeviceIdAction } from '../actions/deviceIdAction'
const initalState = {
    deviceID: ''
}

const deviceIDReducer = (state = initalState, action) => {
    console.log("idreducer",action.payload)
    switch (action.type) {
        case DeviceIdAction.GETDEVICEID: {
            return {
                ...state, deviceID: action.payload
            }
        }
        default: {
            return state
        }
    }
}
export default deviceIDReducer;