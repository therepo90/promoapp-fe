//const host = 'http://localhost:3000';

import { defaultInput } from './cfg';
import './window.js';
import { initRedditBtn } from './reddit/reddit.init';
import { initMediaBtn } from './media/media.init';
import { initVidBtn } from './video/vide.init';
import { getPreparedResults } from './reddit/reddit.service';
import { template as mediaTemplate } from './templates/components/media';
import { template as videoTpl } from './templates/components/video';
import { template as videoPrepTemplate } from './templates/components/video-prep';
import { template as redditTemplate } from './templates/components/reddit';

import { templates } from './templates';

function registerTemplates() {
  templates.register('media', mediaTemplate);
  templates.register('video', videoTpl);
  templates.register('video-prep', videoPrepTemplate);
  templates.register('reddit', redditTemplate);
}

async function initApp() {
  //
  console.log('DOMContentLoaded init...');

  // check for url query param token and save to session storage and remove from url
  const urlParams = new URLSearchParams(window.location.search);
  // paymentSuccess

  document.getElementById('input').value = defaultInput;

  initRedditBtn();
  initMediaBtn(); //
  initVidBtn();

  registerTemplates();

  const token = urlParams.get('token');
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
    btnVid.classList.remove('hidden');
    btnThumb.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  await initApp();
});
