import doRequest from "./doRequest";

export default async function getDetectors() {
    const response = await doRequest('/devices/listdetectors', 'GET', null);
    let detectors = null;
    if (response && response.ok) {
        detectors = await response.json();
    }
    return detectors;
}