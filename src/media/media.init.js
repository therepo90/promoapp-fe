import {doMediaStuff} from "./media.service";

export function initMediaBtn() {
    const btnMedia = document.getElementById('go-btn-thumb');
    btnMedia.addEventListener('click', async function () {
        const url = (document.getElementById('input').value || '').trim();
        if (!url) {
            return;
        }
        btnMedia.disabled = true;
        await doMediaStuff(url, btnMedia).finally(() => {
            btnMedia.disabled = false;
        });
    });
}