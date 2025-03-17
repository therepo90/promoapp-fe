// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"mhI4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldDelay = exports.dell = exports.defaultInput = exports.apiUrl = void 0;
const apiUrl = exports.apiUrl = "false" === 'true' ? 'http://localhost:3000' : 'https://apipromo.idontknowhatimdoing.com';
const dell = exports.dell = "false" === 'true' ? false : true;
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
const shouldDelay = exports.shouldDelay = dell;
const defaultInput = exports.defaultInput = "false" === 'true' ? 'https://teidepermit.eu/' : 'https://promo.idontknowhatimdoing.com/';
//export const defaultInput = 'https://promo.idontknowhatimdoing.com/'; // process.env.LOCAL_DEV === 'true' ? 'https://translatesubtitles.org' : '';
},{}],"Uj2q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBuySession = void 0;
var _cfg = require("./cfg");
const createBuySession = async (url, entityId) => {
  console.log('buy');
  const baseUrl = _cfg.apiUrl;
  const response = await fetch(baseUrl + "/api/stripe/checkout-buy", {
    method: "POST",
    body: JSON.stringify({
      url,
      entityId
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
  console.log('rdr');
  window.location.href = data.url;
};
exports.createBuySession = createBuySession;
},{"./cfg":"mhI4"}],"y5FJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalVars = void 0;
const globalVars = exports.globalVars = {
  paymentUrl: undefined,
  queriedUrl: undefined,
  redditEntityId: undefined,
  mediaEntityId: undefined
};
},{}],"FOZT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleResError = exports.checkResError = void 0;
const checkResError = async response => {
  if (!response.ok) {
    let err;
    try {
      err = await response.clone().json();
    } catch (e) {
      err = await response.clone().text();
    }
    handleResError(err);
    throw new Error(err);
  }
};
exports.checkResError = checkResError;
const handleResError = errObject => {
  let msg = errObject?.error?.message || errObject?.message;
  if (typeof errObject === 'string') {
    msg = errObject;
  }
  alert(msg || 'Error');
  console.error('Res error:');
  console.error(errObject);
};
exports.handleResError = handleResError;
},{}],"LVu9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiCall = apiCall;
exports.poll = poll;
var _cfg = require("./cfg");
var _utils = require("./utils");
// /api/reddit

async function apiCall(body, path) {
  const baseUrl = _cfg.apiUrl;
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  await (0, _utils.checkResError)(res);
  const data = await res.json();
  return data;
}
async function poll(id, fn, count = 0) {
  if (count > 100) {
    throw new Error('Timeout');
  }
  const promo = await fn();
  if (promo.status === 'done') {
    return promo;
  }
  if (promo.status === 'error') {
    alert('Woopsies. Error. It sometimes happens. Lets try again.');
    window.location.reload();
  }
  await new Promise(resolve => setTimeout(resolve, 5000));
  return poll(id, fn, count + 1);
}
},{"./cfg":"mhI4","./utils":"FOZT"}],"tUqo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callReddit = callReddit;
exports.getReddit = getReddit;
var _globalVars = require("./globalVars");
var _cfg = require("./cfg");
var _utils = require("./utils");
var _api = require("./api");
//polling fn to get promo based on status, use getReddit

async function getReddit(id, token) {
  const baseUrl = _cfg.apiUrl;
  console.log('getReddit...', {
    id,
    token
  });
  const tokenQuery = token ? `token=${token}` : '';
  const res = await fetch(`${baseUrl}/api/reddit/${id}?${tokenQuery}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
  await (0, _utils.checkResError)(res);
  const data = await res.json();
  return data;
}
async function callReddit(url) {
  console.log('callReddit...');
  const data = await (0, _api.apiCall)({
    url
  }, '/api/reddit');
  /*    const data = {
          id: 'e8431b98-3699-4db8-a531-5b8194e39f15'
      }*/
  console.log('apiCall done', {
    data
  });
  _globalVars.globalVars.redditEntityId = data.id;
  if (_cfg.shouldDelay) {
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  const redditData = await (0, _api.poll)(data.id, async () => getReddit(data.id));
  return redditData;
}
},{"./globalVars":"y5FJ","./cfg":"mhI4","./utils":"FOZT","./api":"LVu9"}],"hh4g":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callMedia = callMedia;
exports.getMedia = getMedia;
var _globalVars = require("./globalVars");
var _cfg = require("./cfg");
var _utils = require("./utils");
var _api = require("./api");
async function getMedia(id, token) {
  const baseUrl = _cfg.apiUrl;
  console.log('getMedia...', {
    id,
    token
  });
  const tokenQuery = token ? `token=${token}` : '';
  const res = await fetch(`${baseUrl}/api/media/${id}?${tokenQuery}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
  await (0, _utils.checkResError)(res);
  const data = await res.json();
  return data;
}
async function callMedia(url) {
  console.log('callMedia...');
  const data = await (0, _api.apiCall)({
    url
  }, '/api/media');
  /*    const data = {
          id: 'e8431b98-3699-4db8-a531-5b8194e39f15'
      }*/
  console.log('apiCall done', {
    data
  });
  _globalVars.globalVars.mediaEntityId = data.id;
  if (_cfg.shouldDelay) {
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  const resData = await (0, _api.poll)(data.id, async () => getMedia(data.id));
  return resData;
}
},{"./globalVars":"y5FJ","./cfg":"mhI4","./utils":"FOZT","./api":"LVu9"}],"H527":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callVideo = callVideo;
exports.getVideo = getVideo;
var _cfg = require("./cfg");
var _utils = require("./utils");
var _api = require("./api");
async function getVideo(id, token) {
  const baseUrl = _cfg.apiUrl;
  console.log('getVideo...', {
    id,
    token
  });
  const tokenQuery = token ? `token=${token}` : '';
  const res = await fetch(`${baseUrl}/api/video/${id}?${tokenQuery}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  await (0, _utils.checkResError)(res);
  const data = await res.json();
  return data;
}
async function callVideo({
  url,
  mainImg,
  featuresImgs,
  thumbImg
}) {
  console.log('callVideo...');
  const data = await (0, _api.apiCall)({
    url,
    mainImg,
    featuresImgs,
    thumbImg
  }, '/api/video');
  console.log('apiCall done', {
    data
  });
  if (_cfg.shouldDelay) {
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  const resData = await (0, _api.poll)(data.id, async () => getVideo(data.id));
  return resData;
}
},{"./cfg":"mhI4","./utils":"FOZT","./api":"LVu9"}],"imtx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doMediaStuff = doMediaStuff;
exports.doRedditStuff = doRedditStuff;
exports.generateVideo = generateVideo;
exports.updateUI = void 0;
var _cfg = require("./cfg");
var _stripe = require("./stripe");
var _globalVars = require("./globalVars");
var _reddit = require("./reddit");
var _media = require("./media");
var _video = require("./video");
//const host = 'http://localhost:3000';

const updateUI = async () => {};
exports.updateUI = updateUI;
const funnyNames = ["Bob McMuffin", "Chad Thundercock", "Sir Loinsteak", "Jimmy NoToes", "Albie Back", "Barb Dwyer", "Hugh Jass", "Anita Bath", "Ben Dover", "Sal Monella", "Rick O'Shea", "Dustin Trousers", "Stan Dupp", "Pat Myback", "Ella Vator", "Bill Board", "Sue Permann", "Otto Correct", "Paige Turner", "Terry Bull"];
async function getPreparedResults(url, token, entityId) {
  _globalVars.globalVars.queriedUrl = url;
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');
  const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
  document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;
  document.getElementById('loading-succ').classList.add('hidden');
  // delay 1000 s
  //await new Promise(resolve => setTimeout(resolve, 1000000));
  await (0, _reddit.getReddit)(entityId, token).then(redditData => {
    console.log('callReddit done', {
      res: redditData
    });
    proceedWithRedditStuff(redditData);
    document.getElementById('loading-succ').classList.remove('hidden');
  }).finally(() => {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('inputs').classList.remove('hidden');
    document.getElementById('input').value = _globalVars.globalVars.queriedUrl;
  });

  // media? later maybe.
}
function proceedWithRedditStuff(data) {
  const dataContainer = document.getElementById('data-container');
  const templateSource = document.getElementById('reddit-template').innerHTML;
  const template = window.Handlebars.compile(templateSource);
  const html = template(data.json);
  dataContainer.innerHTML = html;
  document.getElementById('loading-succ').classList.remove('hidden');
}
function proceedWithVideoStuff(data) {
  const dataContainer = document.getElementById('data-container');
  const templateSource = document.getElementById('video-template').innerHTML;
  const template = window.Handlebars.compile(templateSource);
  // map apiUrl
  const parsed = {
    ...data.json,
    videoUrl: data.json.videoUrl
  };
  console.log({
    parsed
  });
  const html = template(parsed);
  dataContainer.innerHTML = html;
  document.getElementById('loading-succ').classList.remove('hidden');
}
function proceedWithMediaStuff(data) {
  const dataContainer = document.getElementById('data-container');
  const templateSource = document.getElementById('media-template').innerHTML;
  const template = window.Handlebars.compile(templateSource);
  // map apiUrl
  const parsedImages = {
    ...data.json.generatedImages,
    servingUrls: data.json.generatedImages.servingUrls.map(url => _cfg.apiUrl + url)
  };
  console.log({
    parsedImages
  });
  const html = template({
    ...data.json,
    pageResources: {
      ...data.json.pageResources,
      mainImgServingUrl: _cfg.apiUrl + data.json.pageResources.mainImgServingUrl
    },
    generatedImages: parsedImages
  });
  dataContainer.innerHTML = html;
  document.getElementById('loading-succ').classList.remove('hidden');

  //gen-vid-btn
  const btn = document.getElementById('gen-vid-btn');
  btn.addEventListener('click', async function () {
    const url = (document.getElementById('input').value || '').trim();
    if (!url) {
      return;
    }
    btn.disabled = true;

    //const mainImg = data.json.pageResources.mainImgResourceId;
    //const thumbImg = data.json.generatedImages.imageIds[0];
    const mainImg = _cfg.apiUrl + data.json.pageResources.mainImgServingUrl;
    const thumbImg = _cfg.apiUrl + data.json.generatedImages.servingUrls[0];
    await generateVideo({
      mainImg,
      featuresImgs: [],
      thumbImg,
      url
    }).finally(() => {
      btn.disabled = false;
    });
  });
}
async function generateVideo({
  url,
  mainImg,
  featuresImgs,
  thumbImg
}) {
  console.log('generateVideo', {
    mainImg,
    featuresImgs,
    thumbImg
  });
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');
  const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
  document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;
  document.getElementById('loading-succ').classList.add('hidden');
  // delay 1000 s
  //await new Promise(resolve => setTimeout(resolve, 1000000));
  await (0, _video.callVideo)({
    url,
    mainImg,
    featuresImgs,
    thumbImg
  }).then(data => {
    console.log('callVideo done', {
      res: data
    });
    proceedWithVideoStuff(data);
  }).finally(() => {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('inputs').classList.remove('hidden');
    document.getElementById('input').value = _globalVars.globalVars.queriedUrl;
  });
}
async function doMediaStuff(url) {
  _globalVars.globalVars.queriedUrl = url;
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');
  const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
  document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;
  document.getElementById('loading-succ').classList.add('hidden');
  // delay 1000 s
  //await new Promise(resolve => setTimeout(resolve, 1000000));
  await (0, _media.callMedia)(url).then(data => {
    console.log('callMedia done', {
      res: data
    });
    proceedWithMediaStuff(data);
  }).finally(() => {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('inputs').classList.remove('hidden');
    document.getElementById('input').value = _globalVars.globalVars.queriedUrl;
  });
}
async function doRedditStuff(url) {
  _globalVars.globalVars.queriedUrl = url;
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');
  const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
  document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;
  document.getElementById('loading-succ').classList.add('hidden');
  // delay 1000 s
  //await new Promise(resolve => setTimeout(resolve, 1000000));
  await (0, _reddit.callReddit)(url).then(redditData => {
    console.log('callReddit done', {
      res: redditData
    });
    proceedWithRedditStuff(redditData);
  }).finally(() => {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('inputs').classList.remove('hidden');
    document.getElementById('input').value = _globalVars.globalVars.queriedUrl;
  });
}
document.addEventListener("DOMContentLoaded", async function () {
  console.log('DOMContentLoaded init...');

  // check for url query param token and save to session storage and remove from url
  const urlParams = new URLSearchParams(window.location.search);
  // paymentSuccess
  const token = urlParams.get('token');
  document.getElementById('input').value = _cfg.defaultInput;
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
  const btnMedia = document.getElementById('go-btn-vid');
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
  if (token) {
    const url = decodeURIComponent(urlParams.get('url'));
    const entityId = urlParams.get('entityId');
    console.log('token, url', {
      url,
      token
    });
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('url', url);
    sessionStorage.setItem('entityId', entityId);
    window.history.replaceState({}, document.title, window.location.pathname);
    document.getElementById('inputs').classList.add('hidden');
    await getPreparedResults(url, token, entityId);
  }
  if ("false" !== 'true') {
    btnMedia.classList.add('hidden');
  }
});
window.goToLink = async function (event, url) {
  console.log('goToLink', {
    event,
    url
  });
  if (!url) {
    return;
  }
  if (url === 'Unlock') {
    event.preventDefault();
    document.getElementById('loading').classList.remove('hidden');
    await window.createBuySession(window.globalVars.queriedUrl, window.globalVars.redditEntityId);
  }
};
// expose to moustache
window.createBuySession = _stripe.createBuySession;
window.globalVars = _globalVars.globalVars;
window.copyToClipboard = function copyToClipboard(element) {
  const text = element.innerText; //
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  }).catch(err => {
    console.error("Error copying text: ", err);
  });
};
window.showAnswer = function showAnswer(index, btn) {
  const answerElement = document.getElementById(`answer-${index}`);
  if (answerElement) {
    answerElement.classList.remove('hidden');
  }
  btn.style.display = "none"; // Ukrywa przycisk
};
},{"./cfg":"mhI4","./stripe":"Uj2q","./globalVars":"y5FJ","./reddit":"tUqo","./media":"hh4g","./video":"H527"}]},{},["imtx"], null)