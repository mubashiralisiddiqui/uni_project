
import { DeviceId } from '../actions/deviceIdAction'
const initalState = {
    deviceID: ''
}

const deviceIDReducer = (state = initalState, action) => {
    switch (action.type) {
        case DeviceId.GETDEVICEID: {
            return {
                ...state, DeviceId: action.payload
            }
        }
        default: {
            return state
        }
    }
}
export default deviceIDReducer;