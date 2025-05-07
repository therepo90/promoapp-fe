import { apiUrl, shouldDelay } from './cfg';
import { checkResError } from './utils';
import { apiCall, poll } from './api';

export async function getVideo(id, token) {
  const baseUrl = apiUrl;
  console.log('getVideo...', { id, token });
  const tokenQuery = token ? `token=${token}` : '';
  const res = await fetch(`${baseUrl}/api/video/${id}?${tokenQuery}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  await checkResError(res);
  const data = await res.json();
  return data;
}

export async function callVideo({ url, mainImg, featuresImgs, thumbImg, logoUrl }) {
  console.log('callVideo...');

  const data = await apiCall({
    url,
    mainImg,
    featuresImgs,
    thumbImg,
    logoUrl
  }, '/api/video');
  console.log('apiCall done', { data });
  if (shouldDelay) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  const resData = await poll(data.id, async () => getVideo(data.id));

  return resData;
}