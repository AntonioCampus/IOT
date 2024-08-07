import doRequest from "./doRequest";

export default async function addUser(username: string, password: string, privileged: boolean) {
    const body = {
        user: username,
        password: password,
        isAdmin: privileged
    };

    console.log(body);

    const response = await doRequest('/users/register', 'POST', body);

    if (response && response.ok) return true;
    return false;
}