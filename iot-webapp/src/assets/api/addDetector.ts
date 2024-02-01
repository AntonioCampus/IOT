import { useSessionStore } from "@/stores/session";

export default async function addDetector(idname: String, passcode: String, zone: String) {
    const response = await fetch('https://5e1e-192-167-140-78.ngrok-free.app/api/devices/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + useSessionStore().getToken,
            "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
            idname: idname,
            passcode: passcode,
            zone: '1',
            type: "detector"
        })
    });
    if (response.ok) {
        console.log(response);
        const data = await response.json();
        return data.status;
    }
    return false;
}