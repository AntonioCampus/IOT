import doRequest from './doRequest';

export default async function addDevice(idname: String, passcode: String, zone: String, type: String) {
    /**
     * Add a new device to the system
     * @param idname - The name of the device
     * @param passcode - The passcode of the device
     * @param zone - The zone of the device
     * @param type - The type of the device
     * @returns - The status of the request
    */

    const body = {
        idname: idname,
        passcode: passcode,
        zone: zone,
        type: type
    };

    const method = 'POST';
    const response = await doRequest('/devices/add', method, body);

    if (response && response.ok) {
        const data = await response.json();
        return data.status; // should be true if the request was successful
    }
    return false;
}