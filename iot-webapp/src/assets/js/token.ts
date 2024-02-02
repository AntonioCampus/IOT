export function setToken(new_token: string) {
    localStorage.setItem('user_token', new_token)
}

export function getToken() {
    return localStorage.getItem('user_token')
}

export function removeToken() {
    localStorage.removeItem('user_token')
}