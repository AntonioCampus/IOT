import doRequest from "./doRequest";

export default async function getOverrides() {
    const response = await doRequest('/users/listoverrides', 'GET', null);
    let overrides = null;
    if (response && response.ok) {
        overrides = await response.json();
    }
    return overrides;
}