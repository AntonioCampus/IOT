import doRequest from "./doRequest";

export default async function doLogout() {
    const response = await doRequest('/users/logout', 'POST', null);

    if (response && response.ok) return true;
    return false;
}