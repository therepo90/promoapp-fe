// /api/reddit
import {apiUrl} from "./cfg";
import {checkResError} from "./utils";

export async function apiCall(url, path) {
    const baseUrl = apiUrl;
    const res = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        body: JSON.stringify({url}),

        headers: {
            'Content-Type': 'application/json'
        }
    });
    await checkResError(res);
    const data = await res.json();
    return data;
}

export async function poll(id, fn, count = 0) {
    if (count > 100) {
        throw new Error('Timeout');
    }
    const promo = await fn();
    if (promo.status === 'done') {
        return promo;
    }
    if (promo.status === 'error') {
        alert('Woopsies. Error. It sometimes happens. Lets try again.');
        window.location.reload();
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    return poll(id, fn, count + 1);
}