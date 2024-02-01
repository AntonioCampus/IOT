import { useSessionStore } from "@/stores/session";

export default async function getDashboard() {
    const response = await fetch('https://5e1e-192-167-140-78.ngrok-free.app/api/user/dashboard', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + useSessionStore().getToken,
            "ngrok-skip-browser-warning": "69420",
        },
    });
    let dashboard = null;
    if (response.ok) {
        dashboard = await response.json();
    }
    return dashboard;
}