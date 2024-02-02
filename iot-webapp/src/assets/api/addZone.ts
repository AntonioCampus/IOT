import doRequest from "./doRequest";

export default async function addZone(description: String) {
    const body = {
        info: description
    };

    const response = await doRequest('/zones/add', 'POST', body);
    if (response && response.ok) {
        const data = await response.json();
        return data.status;
    }
    return false;
}