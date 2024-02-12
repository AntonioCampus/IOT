import doRequest from "./doRequest";

export default async function getUsers() {
    const response = await doRequest('/users/', 'GET', null);
    let users = null;
    if (response && response.ok) {
        users = await response.json();
    }
    return users;
}