//polling fn to get promo based on status, use getReddit
import {appState} from "../appState";
import {apiUrl, shouldDelay} from "../cfg";
import {checkResError} from "../utils";
import {apiCall, poll} from "../common/api";

export async function getReddit(id, token) {
    const baseUrl = apiUrl;
    console.log('getReddit...', {id, token});
    const tokenQuery = token ? `token=${token}` : '';
    const res = await fetch(`${baseUrl}/api/reddit/${id}?${tokenQuery}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    await checkResError(res);
    const data = await res.json();
    return data;
}

export async function callReddit(url) {
    console.log('callReddit...');

    const data = await apiCall({ url }, '/api/reddit');
    /*    const data = {
            id: 'e8431b98-3699-4db8-a531-5b8194e39f15'
        }*/
    console.log('apiCall done', {data});
    appState.redditEntityId = data.id;
    if (shouldDelay) {
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
    const redditData = await poll(data.id, async () => getReddit(data.id));

    return redditData;

}