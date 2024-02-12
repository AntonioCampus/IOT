import doRequest from "./doRequest";

export default async function getActuators() {
    const response = await doRequest('/devices/listactuators', 'GET', null);
    let actuators = null;
    if (response && response.ok) {
        actuators = await response.json();
    }
    return actuators;
}