export const apiUrl = process.env.LOCAL_DEV === 'true' ? 'http://localhost:3000' : 'https://apipromo.idontknowhatimdoing.com';
export const dell = process.env.LOCAL_DEV === 'true' ? false : true;
//export const baseUrl = process.env.LOCAL_DEV === 'true' ? 'http://localhost:3000' : 'https://api.translatesubtitles.org';
/*const redirectUrl = process.env.LOCAL_DEV === 'true' ? 'http://localhost:1234' : 'https://translatesubtitles.org';*/
/*
export const auth0Cfg = {
    "domain": "translatesubtitles.eu.auth0.com",
    "clientId": "Yl7KeMwXe4zeLMPz9zIHc33Nircfgxh1",
    authorizationParams: {
        redirect_uri: redirectUrl,
        audience: 'https://translatesubtitles',
    }
}*/
export const shouldDelay = dell;
export const defaultInput = process.env.LOCAL_DEV === 'true' ? 'https://translatesubtitles.org/' : 'https://promo.idontknowhatimdoing.com/';
//export const defaultInput = 'https://promo.idontknowhatimdoing.com/'; // process.env.LOCAL_DEV === 'true' ? 'https://translatesubtitles.org' : '';
