import {apiUrl} from "./cfg";

export const createBuySession = async (url) => {
    console.log('buy');
    const baseUrl = apiUrl;
    const response = await fetch(baseUrl + "/api/stripe/checkout-buy", {
        method: "POST",
        body: JSON.stringify({url}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    console.log(data);
    console.log('rdr');
    window.location.href = data.url;
}