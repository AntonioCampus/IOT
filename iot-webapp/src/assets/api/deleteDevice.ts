import doRequest from './doRequest';

export default async function deleteDevice(id: string, type: string) {
    const body = {
        deviceId: id,
        type: type
    };

    const response = await doRequest('/devices/remove', 'POST', body);
    if (response && response.ok) return true;
    return false;
}