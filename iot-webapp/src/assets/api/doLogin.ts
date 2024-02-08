import doRequest from "./doRequest";
import { setToken } from "../js/token";
import { useUserStore } from "@/stores/user";

export default async function doLogin(username: string, password: string) {
    const body = {
        user: username,
        password: password
    };

    const response = await doRequest('/users/login', 'POST', body);

    if (response && response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        let token_parts = data.access_token.split('.');
        let payload = JSON.parse(atob(token_parts[1]));
        let userStore = useUserStore();
        userStore.setAdmin(payload.isAdmin);
        userStore.setUserId(payload.userId);
        return true;
    }
    return false;
}