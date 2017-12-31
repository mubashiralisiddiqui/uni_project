
import { DeviceIdAction } from '../actions/deviceIdAction'
const initalState = {
    deviceID: '',
    AlluserIDs: []
}

const deviceIDReducer = (state = initalState, action) => {
    switch (action.type) {
        case DeviceIdAction.GETDEVICEID: {
            return {
                ...state, deviceID: action.payload
            }
        }
        case DeviceIdAction.GETALLUSERDEVICEID: {
            return {
                ...state, AlluserIDs: action.payload
            }
        }
        default: {
            return state
        }
    }
}
export default deviceIDReducer;