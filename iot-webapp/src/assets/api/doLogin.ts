import { useSessionStore } from "@/stores/session";

export default async function doLogin(username: string, password: string) {

    const url = 'http://localhost:5000/api/user/login';
    //const url = 'http://192.168.148.248:5000/api/user/login
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'user': username,
            'password': password
        })
    });
    let token = '';
    if (response.ok) {
        const data = await response.json();
        token = data.access_token;
        useSessionStore().setToken(token);
        return true;
    }
    return false;
}