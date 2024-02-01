import { useSessionStore } from "@/stores/session";

export default async function getDashboard() {
    const response = await fetch('https://5e1e-192-167-140-78.ngrok-free.app/api/zones', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + useSessionStore().getToken,
            "ngrok-skip-browser-warning": "69420",
        },
    });
    let zones = null;
    if (response.ok) {
        zones = await response.json();
    }
    return zones;
}