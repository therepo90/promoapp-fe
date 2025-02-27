//const host = 'http://localhost:3000';

import {apiUrl, shouldDelay} from "./cfg";
import {checkResError} from "./utils";
import {createBuySession} from "./stripe";

var globals = {
    paymentUrl: undefined,
    queriedUrl: undefined
};

export const  updateUI = async () => {

}

//polling fn to get promo based on status, use getPromo
async function pollPromo(id, count =0) {
    if(count > 100) {
        throw new Error('Timeout');
    }
    const promo = await getPromo(id);
    if (promo.status === 'done') {
        return promo;
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    return pollPromo(id, count+1);
}

async function getPromo(id) {
    const baseUrl = apiUrl;
    const res =  await fetch(`${baseUrl}/api/promo-info/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    await checkResError(res);
    const data = await res.json();
    return data;
}

async function runGetPromo(url) {
    const baseUrl = apiUrl;
    const res =  await fetch(baseUrl + "/api/promo-info", {
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

export async function callPromo(url) {
    console.log('callPromo...');

    const dataContainer = document.getElementById('data-container');
    const templateSource = document.getElementById('template').innerHTML;
    const template = window.Handlebars.compile(templateSource);

    const data = await runGetPromo(url);
    /*    const data = {
            id: 'e8431b98-3699-4db8-a531-5b8194e39f15'
        }*/
    console.log('runGetPromo done', {data});
    if(shouldDelay) {
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
    const redditData = await pollPromo(data.id);
    const html = template(redditData.json);
    dataContainer.innerHTML = html;
    return redditData;

}
const funnyNames = [
    "Bob McMuffin",
    "Chad Thundercock",
    "Sir Loinsteak",
    "Jimmy NoToes",
    "Albie Back",
    "Barb Dwyer",
    "Hugh Jass",
    "Anita Bath",
    "Ben Dover",
    "Sal Monella",
    "Rick O'Shea",
    "Dustin Trousers",
    "Stan Dupp",
    "Pat Myback",
    "Ella Vator",
    "Bill Board",
    "Sue Permann",
    "Otto Correct",
    "Paige Turner",
    "Terry Bull"
];

async function callStuff(url) {
    globals.queriedUrl = url;
    document.getElementById('data-container').innerHTML = '';
    document.getElementById('loading').classList.remove('hidden');

    const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
    document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;

    document.getElementById('loading-succ').classList.add('hidden');
    // delay 1000 s
    //await new Promise(resolve => setTimeout(resolve, 1000000));
    await callPromo(url).then(res => {
        console.log('callPromo done', {res});
        document.getElementById('loading-succ').classList.remove('hidden');
    }).finally(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('inputs').classList.remove('hidden');
        document.getElementById('input').value = globals.queriedUrl;
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    console.log('DOMContentLoaded init...');
    const btn = document.getElementById('go-btn');

    // check for url query param token and save to session storage and remove from url
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    document.getElementById('input').value = process.env.LOCAL_DEV ? 'https://translatesubtitles.org' : '';
    btn.addEventListener('click', async function () {
        const url = document.getElementById('input').value;
        btn.disabled = true;
        await callStuff(url, btn).finally(() => {
            btn.disabled = false;
        });
    });

    if(token){
        const url = decodeURIComponent(urlParams.get('url'));
        console.log('token, url', {url, token});
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('url', url);
        window.history.replaceState({}, document.title, window.location.pathname);
        document.getElementById('inputs').classList.add('hidden');

        await callStuff(url);
    }

});

window.goToPost = async function (event,url) {
    event.preventDefault();
   if(url === 'Unlock'){
       document.getElementById('loading').classList.remove('hidden');
       await window.createBuySession(globals.queriedUrl);
   } else{
       window.location.href = url;
   }
};
window.createBuySession = createBuySession;