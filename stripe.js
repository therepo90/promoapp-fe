import {apiUrl} from "./src/cfg";

export const createBuySession = async (url, entityId) => {
    console.log('buy');
    const baseUrl = apiUrl;
    const response = await fetch(baseUrl + "/api/stripe/checkout-buy", {
        method: "POST",
        body: JSON.stringify({url, entityId}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    console.log(data);
    console.log('rdr');
    window.location.href = data.url;
}