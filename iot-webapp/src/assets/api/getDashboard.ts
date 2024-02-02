import doRequest from "./doRequest";

export default async function getDashboard() {
    const response = await doRequest('/users/dashboard', 'GET', null);

    let dashboard = null;
    if (response && response.ok) {
        dashboard = await response.json();
    }
    return dashboard;
}