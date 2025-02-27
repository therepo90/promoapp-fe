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
const defaultInput = exports.defaultInput = 'https://translatesubtitles.org/'; // process.env.LOCAL_DEV === 'true' ? 'https://translatesubtitles.org' : '';
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
},{"./cfg":"mhI4"}],"imtx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callPromo = callPromo;
exports.updateUI = void 0;
var _cfg = require("./cfg");
var _utils = require("./utils");
var _stripe = require("./stripe");
//const host = 'http://localhost:3000';

var globals = {
  paymentUrl: undefined,
  queriedUrl: undefined,
  entityId: undefined
};
const updateUI = async () => {};

//polling fn to get promo based on status, use getPromo
exports.updateUI = updateUI;
async function pollPromo(id, count = 0) {
  if (count > 100) {
    throw new Error('Timeout');
  }
  const promo = await getPromo(id);
  if (promo.status === 'done') {
    return promo;
  }
  await new Promise(resolve => setTimeout(resolve, 5000));
  return pollPromo(id, count + 1);
}
async function getPromo(id, token) {
  const baseUrl = _cfg.apiUrl;
  console.log('getPromo...', {
    id,
    token
  });
  const tokenQuery = token ? `token=${token}` : '';
  const res = await fetch(`${baseUrl}/api/promo-info/${id}?${tokenQuery}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
  await (0, _utils.checkResError)(res);
  const data = await res.json();
  return data;
}
async function runGetPromo(url) {
  const baseUrl = _cfg.apiUrl;
  const res = await fetch(baseUrl + "/api/promo-info", {
    method: "POST",
    body: JSON.stringify({
      url
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  await (0, _utils.checkResError)(res);
  const data = await res.json();
  return data;
}
async function callPromo(url) {
  console.log('callPromo...');
  const data = await runGetPromo(url);
  /*    const data = {
          id: 'e8431b98-3699-4db8-a531-5b8194e39f15'
      }*/
  console.log('runGetPromo done', {
    data
  });
  globals.entityId = data.id;
  if (_cfg.shouldDelay) {
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  const redditData = await pollPromo(data.id);
  return redditData;
}
const funnyNames = ["Bob McMuffin", "Chad Thundercock", "Sir Loinsteak", "Jimmy NoToes", "Albie Back", "Barb Dwyer", "Hugh Jass", "Anita Bath", "Ben Dover", "Sal Monella", "Rick O'Shea", "Dustin Trousers", "Stan Dupp", "Pat Myback", "Ella Vator", "Bill Board", "Sue Permann", "Otto Correct", "Paige Turner", "Terry Bull"];
async function getPreparedResults(url, token, entityId) {
  globals.queriedUrl = url;
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');
  const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
  document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;
  document.getElementById('loading-succ').classList.add('hidden');
  // delay 1000 s
  //await new Promise(resolve => setTimeout(resolve, 1000000));
  await getPromo(entityId, token).then(redditData => {
    console.log('callPromo done', {
      res: redditData
    });
    proceedWithRedditStuff(redditData);
    document.getElementById('loading-succ').classList.remove('hidden');
  }).finally(() => {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('inputs').classList.remove('hidden');
    document.getElementById('input').value = globals.queriedUrl;
  });
}
function proceedWithRedditStuff(redditData) {
  const dataContainer = document.getElementById('data-container');
  const templateSource = document.getElementById('template').innerHTML;
  const template = window.Handlebars.compile(templateSource);
  const html = template(redditData.json);
  dataContainer.innerHTML = html;
  document.getElementById('loading-succ').classList.remove('hidden');
}
async function doMarketingStuff(url) {
  globals.queriedUrl = url;
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');
  const name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
  document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;
  document.getElementById('loading-succ').classList.add('hidden');
  // delay 1000 s
  //await new Promise(resolve => setTimeout(resolve, 1000000));
  await callPromo(url).then(redditData => {
    console.log('callPromo done', {
      res: redditData
    });
    proceedWithRedditStuff(redditData);
  }).finally(() => {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('inputs').classList.remove('hidden');
    document.getElementById('input').value = globals.queriedUrl;
  });
}
document.addEventListener("DOMContentLoaded", async function () {
  console.log('DOMContentLoaded init...');
  const btn = document.getElementById('go-btn');

  // check for url query param token and save to session storage and remove from url
  const urlParams = new URLSearchParams(window.location.search);
  // paymentSuccess
  const token = urlParams.get('token');
  document.getElementById('input').value = _cfg.defaultInput;
  btn.addEventListener('click', async function () {
    const url = (document.getElementById('input').value || '').trim();
    if (!url) {
      return;
    }
    btn.disabled = true;
    await doMarketingStuff(url, btn).finally(() => {
      btn.disabled = false;
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
});
window.goToLink = async function (event, url) {
  console.log('goToLink', {
    event,
    url
  });
  event.preventDefault();
  if (!url) {
    return;
  }
  if (url === 'Unlock') {
    document.getElementById('loading').classList.remove('hidden');
    await window.createBuySession(window.globals.queriedUrl, window.globals.entityId);
  } else {
    window.location.href = url;
  }
};
window.createBuySession = _stripe.createBuySession;
window.globals = globals;
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
},{"./cfg":"mhI4","./utils":"FOZT","./stripe":"Uj2q"}]},{},["imtx"], null)