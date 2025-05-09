import {appState} from "../appState";
import {apiUrl, shouldDelay} from "../cfg";
import {checkResError} from "../utils";
import {apiCall, poll} from "../common/api";

export async function getMedia(id, token) {
    const baseUrl = apiUrl;
    console.log('getMedia...', {id, token});
    const tokenQuery = token ? `token=${token}` : '';
    const res = await fetch(`${baseUrl}/api/media/${id}?${tokenQuery}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    await checkResError(res);
    const data = await res.json();
    return data;
}

export async function callMedia(url) {
    console.log('callMedia...');

    const data = await apiCall({ url }, '/api/media');
    /*    const data = {
            id: 'e8431b98-3699-4db8-a531-5b8194e39f15'
        }*/
    console.log('apiCall done', {data});
    appState.mediaEntityId = data.id;
    if (shouldDelay) {
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
    const resData = await poll(data.id, async () => getMedia(data.id));

    return resData;

}