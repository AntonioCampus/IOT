import { useSessionStore } from "@/stores/session";

export default async function getDashboard() {
    const response = await fetch('http://192.168.148.248:5000/api/user/dashboard', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useSessionStore().getToken },
    });
    let dashboard = null;
    if (response.ok) {
        dashboard = await response.json();
    }
    return dashboard;
}