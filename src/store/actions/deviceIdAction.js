


export class DeviceIdAction {

    static GETDEVICEID = 'GETDEVICEID';

    static getdeviceid = (payload) => ({
        type: DeviceIdAction.GETDEVICEID,
        payload
    })

}