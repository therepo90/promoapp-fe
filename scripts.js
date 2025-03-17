//const host = 'http://localhost:3000';

import {apiUrl, defaultInput} from "./cfg";
import {createBuySession} from "./stripe";
import {globalVars} from "./globalVars";
import {callReddit, getReddit} from "./reddit";
import {callMedia} from "./media";
import {callVideo} from "./video";


export const  updateUI = async () => {

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

async function getPreparedResults(url, token, entityId) {
    globalVars.queriedUrl = url;
    document.getElementById('data-container').innerHTML = '';
    document.getElementById('loading').classList.remove('hidden');

    const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
    document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;

    document.getElementById('loading-succ').classList.add('hidden');
    // delay 1000 s
    //await new Promise(resolve => setTimeout(resolve, 1000000));
    await getReddit(entityId, token).then(redditData => {
        console.log('callReddit done', {res: redditData});
        proceedWithRedditStuff(redditData);
        document.getElementById('loading-succ').classList.remove('hidden');
    }).finally(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('inputs').classList.remove('hidden');
        document.getElementById('input').value = globalVars.queriedUrl;
    });

    // media? later maybe.
}

function proceedWithRedditStuff(data) {
    const dataContainer = document.getElementById('data-container');
    const templateSource = document.getElementById('reddit-template').innerHTML;
    const template = window.Handlebars.compile(templateSource);
    const html = template(data.json);
    dataContainer.innerHTML = html;
    document.getElementById('loading-succ').classList.remove('hidden');
}

function proceedWithVideoStuff(data) {

}
function proceedWithMediaStuff(data) {
    const dataContainer = document.getElementById('data-container');
    const templateSource = document.getElementById('media-template').innerHTML;
    const template = window.Handlebars.compile(templateSource);
    // map apiUrl
    const parsedImages = {
        ...data.json.generatedImages,
            servingUrls: data.json.generatedImages.servingUrls.map(url => apiUrl + url)
    };
    console.log({parsedImages});
    const html = template({
        ...data.json,
        pageResources: {
            ...data.json.pageResources,
            mainImgServingUrl: apiUrl + data.json.pageResources.mainImgServingUrl
        },
        generatedImages: parsedImages
    });
    dataContainer.innerHTML = html;
    document.getElementById('loading-succ').classList.remove('hidden');

     //gen-vid-btn
    const btn = document.getElementById('gen-vid-btn');
    btn.addEventListener('click', async function () {
        const url = (document.getElementById('input').value || '').trim();
        if (!url) {
            return;
        }
        btn.disabled = true;

        //const mainImg = data.json.pageResources.mainImgResourceId;
        //const thumbImg = data.json.generatedImages.imageIds[0];
        const mainImg = apiUrl + data.json.pageResources.mainImgServingUrl;
        const thumbImg = apiUrl + data.json.generatedImages.servingUrls[0];

        await generateVideo({
            mainImg,
            featuresImgs: [],
            thumbImg,
            url
        }).finally(() => {
            btn.disabled = false;
        });
    });
}
export async function generateVideo({url, mainImg, featuresImgs, thumbImg}) {
    console.log('generateVideo', {mainImg, featuresImgs, thumbImg});

    document.getElementById('data-container').innerHTML = '';
    document.getElementById('loading').classList.remove('hidden');

    const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
    document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;

    document.getElementById('loading-succ').classList.add('hidden');
    // delay 1000 s
    //await new Promise(resolve => setTimeout(resolve, 1000000));
    await callVideo({
        url,
        mainImg,
        featuresImgs,
        thumbImg
    }).then(data => {
        console.log('callVideo done', {res: data});
        proceedWithVideoStuff(data);
    }).finally(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('inputs').classList.remove('hidden');
        document.getElementById('input').value = globalVars.queriedUrl;
    });

}
export async function doMediaStuff(url) {
    globalVars.queriedUrl = url;
    document.getElementById('data-container').innerHTML = '';
    document.getElementById('loading').classList.remove('hidden');

    const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
    document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;

    document.getElementById('loading-succ').classList.add('hidden');
    // delay 1000 s
    //await new Promise(resolve => setTimeout(resolve, 1000000));
    await callMedia(url).then(data => {
        console.log('callMedia done', {res: data});
        proceedWithMediaStuff(data);
    }).finally(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('inputs').classList.remove('hidden');
        document.getElementById('input').value = globalVars.queriedUrl;
    });
}

export async function doRedditStuff(url) {
    globalVars.queriedUrl = url;
    document.getElementById('data-container').innerHTML = '';
    document.getElementById('loading').classList.remove('hidden');

    const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
    document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;

    document.getElementById('loading-succ').classList.add('hidden');
    // delay 1000 s
    //await new Promise(resolve => setTimeout(resolve, 1000000));
    await callReddit(url).then(redditData => {
        console.log('callReddit done', {res: redditData});
        proceedWithRedditStuff(redditData);
    }).finally(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('inputs').classList.remove('hidden');
        document.getElementById('input').value = globalVars.queriedUrl;
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    console.log('DOMContentLoaded init...');

    // check for url query param token and save to session storage and remove from url
    const urlParams = new URLSearchParams(window.location.search);
    // paymentSuccess
    const token = urlParams.get('token');

    document.getElementById('input').value = defaultInput;
    const btnReddit = document.getElementById('go-btn-reddit');
    btnReddit.addEventListener('click', async function () {
        const url = (document.getElementById('input').value || '').trim();
        if(!url){
            return;
        }
        btnReddit.disabled = true;
        await doRedditStuff(url, btnReddit).finally(() => {
            btnReddit.disabled = false;
        });
    });

    const btnMedia = document.getElementById('go-btn-vid');
    btnMedia.addEventListener('click', async function () {
        const url = (document.getElementById('input').value || '').trim();
        if(!url){
            return;
        }
        btnMedia.disabled = true;
        await doMediaStuff(url, btnMedia).finally(() => {
            btnMedia.disabled = false;
        });
    });

    if(token){
        const url = decodeURIComponent(urlParams.get('url'));
        const entityId = urlParams.get('entityId');
        console.log('token, url', {url, token});
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('url', url);
        sessionStorage.setItem('entityId', entityId);

        window.history.replaceState({}, document.title, window.location.pathname);
        document.getElementById('inputs').classList.add('hidden');

        await getPreparedResults(url, token, entityId);
    }

    if(process.env.LOCAL_DEV!=='true'){
        btnMedia.classList.add('hidden');
    }

});

window.goToLink = async function (event, url) {
    console.log('goToLink', {event, url});

    if(!url){
        return;
    }
   if(url === 'Unlock'){
       event.preventDefault();
       document.getElementById('loading').classList.remove('hidden');
       await window.createBuySession(window.globalVars.queriedUrl, window.globalVars.redditEntityId);
   }
};
// expose to moustache
window.createBuySession = createBuySession;
window.globalVars = globalVars;

window.copyToClipboard = function copyToClipboard(element) {
    const text = element.innerText;//
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        console.error("Error copying text: ", err);
    });
}

window.showAnswer =  function showAnswer(index, btn) {
    const answerElement = document.getElementById(`answer-${index}`);
    if (answerElement) {
        answerElement.classList.remove('hidden');
    }
    btn.style.display = "none"; // Ukrywa przycisk
}