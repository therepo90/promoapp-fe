import { apiUrl, uploadApiUrl } from '../cfg';
import { appState } from '../appState';
import { uploadApi } from '../upload/upload-api';
import { funnyNames } from '../consts';
import { callVideo } from './video.api';
import {callMedia} from "../media/media.api";
import {initUpload} from "../upload/upload";

export function proceedWithVideoPreparationStuff(data) {
  const dataContainer = document.getElementById('data-container');
  const templateSource = document.getElementById('video-prep-template').innerHTML;
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


export async function doVideoStuff(url) {
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
        proceedWithVideoPreparationStuff(data);
      })
      .finally(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('inputs').classList.remove('hidden');
        document.getElementById('input').value = appState.queriedUrl;
      });
}

export function proceedWithVideoStuff(data) {
  const dataContainer = document.getElementById('data-container');
  const templateSource = document.getElementById('video-template').innerHTML;
  const template = window.Handlebars.compile(templateSource);
  // map apiUrl
  const parsed = {
    ...data.json,
    videoUrl: apiUrl + data.json.videoServingUrl,
  };
  console.log({ parsed });
  const html = template(parsed);
  dataContainer.innerHTML = html;
  document.getElementById('loading-succ').classList.remove('hidden');
}

export async function generateVideo({ url, mainImg, featuresImgs, thumbImg, logoUrl }) {
  console.log('generateVideo', { mainImg, featuresImgs, thumbImg });

  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');

  const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
  document.getElementById('loading-text').innerText =
    `Hey my name is ${name} and I'll work for you today...gimme a sec`;

  document.getElementById('loading-succ').classList.add('hidden');
  // delay 1000 s
  //await new Promise(resolve => setTimeout(resolve, 1000000));
  await callVideo({
    url,
    mainImg,
    featuresImgs,
    thumbImg,
    logoUrl,
  })
    .then((data) => {
      console.log('callVideo done', { res: data });
      proceedWithVideoStuff(data);
    })
    .finally(() => {
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('inputs').classList.remove('hidden');
      document.getElementById('input').value = appState.queriedUrl;
    });
}

export async function onGenerateVideoClick(btn, data) {
  const url = (document.getElementById('input').value || '').trim();
  if (!url) {
    return;
  }
  btn.disabled = true;

  //const mainImg = data.json.pageResources.mainImgResourceId;
  //const thumbImg = data.json.generatedImages.imageIds[0];
  const mainImg = apiUrl + data.json.pageResources.mainImgServingUrl;
  const thumbImg = appState.vid.entering.servingUrl; //data.json.generatedImages.servingUrls[0];
  const featuresImgsRaw = [appState.vid.feature1File, appState.vid.feature2File].filter((e) => e);
  const logoUrl = apiUrl + data.json.pageResources.logoImgServingUrl;
  // trzebaby tu callnac upload api, upnac obrazki i zwrócić urle
  const featuresImgs = [];
  for (const fimg of featuresImgsRaw) {
    const formData = new FormData();
    formData.append('file', fimg);
    const { filename } = await uploadApi.uploadFile(formData);
    const servingUrl = `${uploadApiUrl}/file/${filename}`;
    featuresImgs.push(servingUrl);
  }
  await generateVideo({
    logoUrl,
    mainImg,
    featuresImgs,
    thumbImg,
    url,
  }).finally(() => {
    btn.disabled = false;
  });
}