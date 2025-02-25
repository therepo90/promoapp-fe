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
exports.apiUrl = void 0;
const apiUrl = exports.apiUrl = "false" === 'true' ? 'http://localhost:3000' : 'https://apipromo.idontknowhatimdoing.com';
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
},{}],"imtx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callPromo = callPromo;
exports.updateUI = void 0;
var _cfg = require("./cfg");
var _utils = require("./utils");
//const host = 'http://localhost:3000';

var globals = {
  paymentUrl: undefined
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
async function getPromo(id) {
  const baseUrl = _cfg.apiUrl;
  const res = await fetch(`${baseUrl}/api/promo-info/${id}`, {
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
  const dataContainer = document.getElementById('data-container');
  const templateSource = document.getElementById('template').innerHTML;
  const template = window.Handlebars.compile(templateSource);
  const data = await runGetPromo(url);
  console.log('runGetPromo done', {
    data
  });
  /*const data = {
      id: 'e8431b98-3699-4db8-a531-5b8194e39f15'
  }*/
  const redditData = await pollPromo(data.id);
  const html = template(redditData.json);
  dataContainer.innerHTML = html;
}
document.addEventListener("DOMContentLoaded", async function () {
  console.log('DOMContentLoaded init...');
  const btn = document.getElementById('go-btn');
  btn.addEventListener('click', async function () {
    const url = document.getElementById('input').value;
    btn.disabled = true;
    document.getElementById('data-container').innerHTML = '';
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('loading-succ').classList.add('hidden');
    // delay 1000 s
    //await new Promise(resolve => setTimeout(resolve, 1000000));
    await callPromo(url).then(res => {
      console.log('callPromo done', res);
      document.getElementById('loading-succ').classList.remove('hidden');
    }).finally(() => {
      btn.disabled = false;
      document.getElementById('loading').classList.add('hidden');
    });
  });
});
},{"./cfg":"mhI4","./utils":"FOZT"}]},{},["imtx"], null)