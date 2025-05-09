//const host = 'http://localhost:3000';

import { defaultInput } from './cfg';
import { appState } from './appState';
import { getReddit } from './reddit/reddit.api.js/reddit';
import './window.js';
import { initRedditBtn } from './reddit/reddit.init';
import { initMediaBtn } from './media/media.init';
import { initVidBtn } from './video/vide.init';
import { funnyNames } from './consts';
import { proceedWithRedditStuff } from './reddit/reddit.service';

export const updateUI = async () => {};

async function getPreparedResults(url, token, entityId) {
  appState.queriedUrl = url;
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');

  const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
  document.getElementById('loading-text').innerText =
    `Hey my name is ${name} and I'll work for you today...gimme a sec`;

  document.getElementById('loading-succ').classList.add('hidden');
  // delay 1000 s
  //await new Promise(resolve => setTimeout(resolve, 1000000));
  await getReddit(entityId, token)
    .then((redditData) => {
      console.log('callReddit done', { res: redditData });
      proceedWithRedditStuff(redditData);
      document.getElementById('loading-succ').classList.remove('hidden');
    })
    .finally(() => {
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('inputs').classList.remove('hidden');
      document.getElementById('input').value = appState.queriedUrl;
    });

  // media? later maybe.
}

async function initApp() { //
  console.log('DOMContentLoaded init...');

  // check for url query param token and save to session storage and remove from url
  const urlParams = new URLSearchParams(window.location.search);
  // paymentSuccess
  const token = urlParams.get('token');

  document.getElementById('input').value = defaultInput;
  initRedditBtn();
  initMediaBtn();//
  initVidBtn();

  if (token) {
    const url = decodeURIComponent(urlParams.get('url'));
    const entityId = urlParams.get('entityId');
    console.log('token, url', { url, token });
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('url', url);
    sessionStorage.setItem('entityId', entityId);

    window.history.replaceState({}, document.title, window.location.pathname);
    document.getElementById('inputs').classList.add('hidden');

    await getPreparedResults(url, token, entityId);
  }

  const btnVid = document.getElementById('go-btn-vid');
  const btnThumb = document.getElementById('go-btn-thumb');
  if (process.env.LOCAL_DEV !== 'true') {
    btnVid.classList.add('hidden');
    btnThumb.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  await initApp();
});
