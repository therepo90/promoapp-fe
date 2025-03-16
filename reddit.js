//polling fn to get promo based on status, use getReddit
import {globalVars} from "./globalVars";
import {apiUrl, shouldDelay} from "./cfg";
import {checkResError} from "./utils";

export async function pollReddit(id, count = 0) {
    if (count > 100) {
        throw new Error('Timeout');
    }
    const promo = await getReddit(id);
    if (promo.status === 'done') {
        return promo;
    }
    if (promo.status === 'error') {
        alert('Woopsies. Error. It sometimes happens. Lets try again.');
        window.location.reload();
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    return pollReddit(id, count + 1);
}

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

export async function runGetReddit(url) {
    const baseUrl = apiUrl;
    const res = await fetch(baseUrl + "/api/reddit", {
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

export async function callReddit(url) {
    console.log('callReddit...');

    const data = await runGetReddit(url);
    /*    const data = {
            id: 'e8431b98-3699-4db8-a531-5b8194e39f15'
        }*/
    console.log('runGetPromo done', {data});
    globalVars.entityId = data.id;
    if (shouldDelay) {
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
    const redditData = await pollReddit(data.id);

    return redditData;

}