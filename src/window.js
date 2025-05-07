import {createBuySession} from "./stripe";
import {appState} from "./appState";

window.goToLink = async function (event, url) {
    console.log('goToLink', {event, url});

    if(!url){
        return;
    }
    if(url === 'Unlock'){
        event.preventDefault();
        document.getElementById('loading').classList.remove('hidden');
        await window.createBuySession(window.appState.queriedUrl, window.appState.redditEntityId);
    }
};
// expose to moustache
window.createBuySession = createBuySession;
window.globalVars = appState;

window.copyToClipboard = function copyToClipboard(element) {
    const text = element.innerText;//
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        console.error("Error copying text: ", err);
    });
}

window.selectEntering =  function selectEntering(e,index, url) {
    console.log(arguments);
    e.preventDefault();
    appState.vid = appState.vid || {};
    appState.vid.entering = {
        servingUrl: url,
        index
    };
    // uncheck class selected to all .image-item
    const items = document.querySelectorAll('.thumbs .image-item');
    items.forEach(item => {
        item.classList.remove('selected');
    });
    // check class selected to this item
    const selectedItem = document.querySelector(`#image-item-${index}`);
    selectedItem.classList.add('selected');
};
window.showAnswer =  function showAnswer(index, btn) {
    const answerElement = document.getElementById(`answer-${index}`);
    if (answerElement) {
        answerElement.classList.remove('hidden');
    }
    btn.style.display = "none"; // Ukrywa przycisk
}