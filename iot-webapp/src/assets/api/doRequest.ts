import { useSessionStore } from "@/stores/session";
import Config from "@/config/config";

function isHTPPMethod(method: string) {
    return ['GET', 'POST', 'PUT', 'DELETE'].includes(method.toUpperCase());
}

export default async function doRequest(path: string, method: string, body: any): Promise<Response | undefined> {
    if (!isHTPPMethod(method)) return undefined;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + useSessionStore().getToken, // auth token
        "ngrok-skip-browser-warning": "69420", // ngrok header to skip browser warning
    };

    const options = {
        method: method.toUpperCase(),
        headers: headers,
        body: body ? JSON.stringify(body) : null,
    };

    const url = Config.API_URL + path;
    return await fetch(url, options);
}