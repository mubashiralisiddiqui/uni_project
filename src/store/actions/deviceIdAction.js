


export class DeviceIdAction {

    static GETDEVICEID = 'GETDEVICEID';
    static GETALLUSERDEVICEID = "ALLUSERDEVICEID"

    static getdeviceid = (payload) => ({
        type: DeviceIdAction.GETDEVICEID,
        payload
    })
    static getAllUserId = (payload) => (
        {
            type: DeviceIdAction.GETALLUSERDEVICEID,
            payload
        })
}