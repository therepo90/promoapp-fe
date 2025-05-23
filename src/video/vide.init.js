import {doVideoStuff} from "./video.service";

export function initVidBtn() {
    const btnVid = document.getElementById('go-btn-vid');
    btnVid.addEventListener('click', async function () {
        const url = (document.getElementById('input').value || '').trim();
        if (!url) {
            return;
        }
        btnVid.disabled = true;
        await doVideoStuff(url, btnVid).finally(() => {
            btnVid.disabled = false;
        });
    });
}