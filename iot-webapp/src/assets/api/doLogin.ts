import doRequest from "./doRequest";
import { useSessionStore } from "@/stores/session";

export default async function doLogin(username: string, password: string) {
    const body = {
        user: username,
        password: password
    };

    const response = await doRequest('/users/login', 'POST', body);

    if (response && response.ok) {
        const data = await response.json();
        useSessionStore().setToken(data.access_token);
        return true;
    }
    return false;
}