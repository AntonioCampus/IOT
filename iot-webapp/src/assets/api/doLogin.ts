import doRequest from "./doRequest";
import { setToken } from "../js/token";

export default async function doLogin(username: string, password: string) {
    const body = {
        user: username,
        password: password
    };

    const response = await doRequest('/users/login', 'POST', body);

    if (response && response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        return true;
    }
    return false;
}