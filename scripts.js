//const host = 'http://localhost:3000';

import {apiUrl} from "./cfg";
import {checkResError} from "./utils";

var globals = {
    paymentUrl: undefined,
};

export const  updateUI = async () => {

}

async function getPromo(url) {
    const baseUrl = apiUrl;
    const res =  await fetch(baseUrl + "/api/promo-info", {
        method: "POST",
        body: JSON.stringify({url}),

        headers: {
            'Content-Type': 'application/json'
        }
    });
    await checkResError(res);
    const data = await res.json();
    return data;
}

export async function callPromo(url) {
    console.log('callPromo...');

    const dataContainer = document.getElementById('data-container');
    const templateSource = document.getElementById('template').innerHTML;
    const template = window.Handlebars.compile(templateSource);

    const data = await getPromo(url);
    // fill json-c pre element
    //document.getElementById('json-c').textContent = JSON.stringify(data, null, 2);


    const html = template(data); // Pass the data to the template

    dataContainer.innerHTML = html;

}

document.addEventListener("DOMContentLoaded", async function () {
    console.log('DOMContentLoaded init...');
    const btn = document.getElementById('go-btn');
    btn.addEventListener('click', async function () {
        const url = document.getElementById('input').value;
        btn.disabled = true;
        await callPromo(url);
        btn.disabled = false;
    });

});
