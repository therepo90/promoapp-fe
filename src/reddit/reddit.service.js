import { appState } from '../appState';
import { funnyNames } from '../consts';
import { callReddit } from './reddit.api.js/reddit';

export function proceedWithRedditStuff(data) {
  const dataContainer = document.getElementById('data-container');
  const templateSource = document.getElementById('reddit-template').innerHTML;
  const template = window.Handlebars.compile(templateSource);
  const html = template(data.json);
  dataContainer.innerHTML = html;
  document.getElementById('loading-succ').classList.remove('hidden');
}

export async function doRedditStuff(url) {
  appState.queriedUrl = url;
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');

  const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
  document.getElementById('loading-text').innerText =
    `Hey my name is ${name} and I'll work for you today...gimme a sec`;

  document.getElementById('loading-succ').classList.add('hidden');
  // delay 1000 s
  //await new Promise(resolve => setTimeout(resolve, 1000000));
  await callReddit(url)
    .then((redditData) => {
      console.log('callReddit done', { res: redditData });
      proceedWithRedditStuff(redditData);
    })
    .finally(() => {
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('inputs').classList.remove('hidden');
      document.getElementById('input').value = appState.queriedUrl;
    });
}