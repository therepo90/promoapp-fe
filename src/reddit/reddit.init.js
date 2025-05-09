import {doRedditStuff} from "./reddit.service";

export function initRedditBtn() {
    const btnReddit = document.getElementById('go-btn-reddit');
    btnReddit.addEventListener('click', async function () {
        const url = (document.getElementById('input').value || '').trim();
        if (!url) {
            return;
        }
        btnReddit.disabled = true;
        await doRedditStuff(url, btnReddit).finally(() => {
            btnReddit.disabled = false;
        });
    });
}