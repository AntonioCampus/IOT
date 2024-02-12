import doRequest from "./doRequest";

export default async function deleteUser(id: string) {
    const body = {
        UserId: id
    };

    console.log(body);

    const response = await doRequest('/users/remove', 'POST', body);

    if (response && response.ok) return true;
    return false;
}