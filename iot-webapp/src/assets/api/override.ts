import doRequest from "./doRequest";

export default async function override(zone_id: string) {
    const body = {
        zone: zone_id
    };
    const response = await doRequest('/users/override', 'POST', body);

    if (response && response.ok) return true;
    return false;
}