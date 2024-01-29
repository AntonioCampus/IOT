export default async function doLogin(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
        return true;
    }
    return false;
}