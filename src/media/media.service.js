import { apiUrl } from '../cfg';
import { appState } from '../appState';
import { initUpload } from '../upload';
import { onGenerateVideoClick } from '../video/video.service';
import { funnyNames } from '../consts';
import { callMedia } from '../media';

export function proceedWithMediaStuff(data) {
  const dataContainer = document.getElementById('data-container');
  const templateSource = document.getElementById('media-template').innerHTML;
  const template = window.Handlebars.compile(templateSource);
  // map apiUrl
  const parsedImages = {
    ...data.json.generatedImages,
    servingUrls: data.json.generatedImages.servingUrls.map((url) => apiUrl + url),
  };
  console.log({ parsedImages });
  const html = template({
    ...data.json,
    pageResources: {
      ...data.json.pageResources,
      mainImgServingUrl: apiUrl + data.json.pageResources.mainImgServingUrl,
      logoImgServingUrl: apiUrl + data.json.pageResources.logoImgServingUrl,
    },
    generatedImages: parsedImages,
  });
  dataContainer.innerHTML = html;
  document.getElementById('loading-succ').classList.remove('hidden');

  document.getElementById('image-item-0').classList.add('selected');
  appState.vid.entering.servingUrl = apiUrl + data.json.pageResources.mainImgServingUrl;
  //gen-vid-btn
  const btn = document.getElementById('gen-vid-btn');

  initUpload('upload-form1', (file) => {
    appState.vid.feature1File = file;
  });
  initUpload('upload-form2', (file) => {
    appState.vid.feature2File = file;
  });
  appState.vid.logoUrl = apiUrl + data.json.pageResources.logoImgServingUrl;
  appState.vid.mainImg = apiUrl + data.json.pageResources.mainImgServingUrl;
  btn.addEventListener('click', async function () {
    await onGenerateVideoClick(btn, data);
  });
}

export async function doMediaStuff(url) {
  appState.queriedUrl = url;
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');

  const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
  document.getElementById('loading-text').innerText =
    `Hey my name is ${name} and I'll work for you today...gimme a sec`;

  document.getElementById('loading-succ').classList.add('hidden');
  // delay 1000 s
  //await new Promise(resolve => setTimeout(resolve, 1000000));
  await callMedia(url)
    .then((data) => {
      console.log('callMedia done', { res: data }); //
      proceedWithMediaStuff(data);
    })
    .finally(() => {
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('inputs').classList.remove('hidden');
      document.getElementById('input').value = appState.queriedUrl;
    });
}