import { apiUrl, uploadApiUrl } from '../cfg';
import { appState } from '../appState';
import { uploadApi } from '../upload-api';
import { funnyNames } from '../consts';
import { callVideo } from '../video';

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