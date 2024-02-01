import { useSessionStore } from "@/stores/session";

export default async function addZone(description: String) {
    const response = await fetch('https://5e1e-192-167-140-78.ngrok-free.app/api/zones/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + useSessionStore().getToken,
            "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
            info: description
        })
    });
    if (response.ok) {
        const data = await response.json();
        return data.status;
    }
    return false;
}