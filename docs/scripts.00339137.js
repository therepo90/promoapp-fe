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
})({"WSJK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadApiUrl = exports.shouldDelay = exports.dell = exports.defaultInput = exports.apiUrl = void 0;
const apiUrl = exports.apiUrl = "false" === 'true' ? 'http://localhost:3000' : 'https://apipromo.idontknowhatimdoing.com';
const uploadApiUrl = exports.uploadApiUrl = "false" === 'true' ? 'http://localhost:3009' : 'https://upload-api.idontknowhatimdoing.com';
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
const defaultInput = exports.defaultInput = "false" === 'true' ? 'https://financialpanda.pl/' : '';
//export const defaultInput = 'https://promo.idontknowhatimdoing.com/'; // process.env.LOCAL_DEV === 'true' ? 'https://translatesubtitles.org' : '';
},{}],"v86b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBuySession = void 0;
var _cfg = require("../cfg");
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
},{"../cfg":"WSJK"}],"rHxW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appState = void 0;
const appState = exports.appState = {
  paymentUrl: undefined,
  queriedUrl: undefined,
  redditEntityId: undefined,
  mediaEntityId: undefined,
  vid: {
    entering: {
      servingUrl: undefined
    },
    logoUrl: undefined,
    mainImg: undefined,
    feature1File: undefined,
    feature2File: undefined
  }
};
},{}],"DHZK":[function(require,module,exports) {
"use strict";

var _stripe = require("./stripe/stripe");
var _appState = require("./appState");
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
    await window.createBuySession(window.appState.queriedUrl, window.appState.redditEntityId);
  }
};
// expose to moustache
window.createBuySession = _stripe.createBuySession;
window.appState = _appState.appState;
window.copyToClipboard = function copyToClipboard(element) {
  const text = element.innerText; //
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  }).catch(err => {
    console.error("Error copying text: ", err);
  });
};
window.selectEntering = function selectEntering(e, index, url) {
  console.log(arguments);
  e.preventDefault();
  _appState.appState.vid = _appState.appState.vid || {};
  _appState.appState.vid.entering = {
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
window.showAnswer = function showAnswer(index, btn) {
  const answerElement = document.getElementById(`answer-${index}`);
  if (answerElement) {
    answerElement.classList.remove('hidden');
  }
  btn.style.display = "none"; // Ukrywa przycisk
};
},{"./stripe/stripe":"v86b","./appState":"rHxW"}],"XeAP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.funnyNames = void 0;
const funnyNames = exports.funnyNames = ['Bob McMuffin', 'Chad Thundercock', 'Sir Loinsteak', 'Jimmy NoToes', 'Albie Back', 'Barb Dwyer', 'Hugh Jass', 'Anita Bath', 'Ben Dover', 'Sal Monella', "Rick O'Shea", 'Dustin Trousers', 'Stan Dupp', 'Pat Myback', 'Ella Vator', 'Bill Board', 'Sue Permann', 'Otto Correct', 'Paige Turner', 'Terry Bull'];
},{}],"K0yk":[function(require,module,exports) {
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
},{}],"EzUZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiCall = apiCall;
exports.poll = poll;
var _cfg = require("../cfg");
var _utils = require("../utils");
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
},{"../cfg":"WSJK","../utils":"K0yk"}],"Wnx8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callReddit = callReddit;
exports.getReddit = getReddit;
var _appState = require("../appState");
var _cfg = require("../cfg");
var _utils = require("../utils");
var _api = require("../common/api");
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
  _appState.appState.redditEntityId = data.id;
  if (_cfg.shouldDelay) {
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  const redditData = await (0, _api.poll)(data.id, async () => getReddit(data.id));
  return redditData;
}
},{"../appState":"rHxW","../cfg":"WSJK","../utils":"K0yk","../common/api":"EzUZ"}],"j0QR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templates = exports.Templates = void 0;
class Templates {
  constructor() {
    this.templates = {};
  }
  register(name, templateSrc) {
    console.log('registering template', name);
    this.templates[name] = window.Handlebars.compile(templateSrc);
  }
  get(name) {
    return this.templates[name];
  }
}
exports.Templates = Templates;
const templates = exports.templates = new Templates();
},{}],"Ofbo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doRedditStuff = doRedditStuff;
exports.getPreparedResults = getPreparedResults;
exports.proceedWithRedditStuff = proceedWithRedditStuff;
var _appState = require("../appState");
var _consts = require("../consts");
var _reddit = require("./reddit.api");
var _templates = require("../templates");
function proceedWithRedditStuff(data) {
  const dataContainer = document.getElementById('data-container');
  const template = _templates.templates.get('reddit');
  const html = template(data.json);
  dataContainer.innerHTML = html;
  document.getElementById('loading-succ').classList.remove('hidden');
}
async function doRedditStuff(url) {
  _appState.appState.queriedUrl = url;
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');
  const name = _consts.funnyNames[Math.floor(Math.random() * _consts.funnyNames.length)];
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
    document.getElementById('input').value = _appState.appState.queriedUrl;
  });
}
async function getPreparedResults(url, token, entityId) {
  _appState.appState.queriedUrl = url;
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');
  const name = _consts.funnyNames[Math.floor(Math.random() * _consts.funnyNames.length)];
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
    document.getElementById('input').value = _appState.appState.queriedUrl;
  });

  // media? later maybe.
}
},{"../appState":"rHxW","../consts":"XeAP","./reddit.api":"Wnx8","../templates":"j0QR"}],"Gfrc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRedditBtn = initRedditBtn;
var _reddit = require("./reddit.service");
function initRedditBtn() {
  const btnReddit = document.getElementById('go-btn-reddit');
  btnReddit.addEventListener('click', async function () {
    const url = (document.getElementById('input').value || '').trim();
    if (!url) {
      alert('Type in url bro.');
      return;
    }
    btnReddit.disabled = true;
    await (0, _reddit.doRedditStuff)(url, btnReddit).finally(() => {
      btnReddit.disabled = false;
    });
  });
}
},{"./reddit.service":"Ofbo"}],"AlRU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initUpload = initUpload;
let uploadFormConfig = null;
const htmlFormObj = {
  'upload-form1': {
    selectedFile: null,
    croppedFile: null
  },
  'upload-form2': {
    selectedFile: null,
    croppedFile: null
  }
};
let MAX_FILE_SIZE = 350 * 1024 * 10 * 2; // 7mb

function initUpload(formId, onFileUpload) {
  console.log('initUpload', formId);
  const form = document.getElementById(formId);
  const dropzone = form.querySelector('.dropzone');
  const fileInput = form.getElementsByClassName('file')[0];
  const filenamePreview = form.getElementsByClassName('filename-preview')[0];
  const uploadText = form.getElementsByClassName('upload-text')[0];
  dropzone.addEventListener('dragover', e => {
    e.preventDefault();
    dropzone.classList.add('drag-over');
  });
  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('drag-over');
  });
  /*dropzone.addEventListener('click', () => {
    fileInput.click(); // Wywołuje kliknięcie na ukrytym input file
  });*/

  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    const file = files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert('File too big. Max is 350KB.');
      this.value = '';
      throw new Error('File too big.');
    }
    fileInput.files = e.dataTransfer.files;
    handleFiles(files);
  });
  fileInput.addEventListener('change', e => {
    const files = e.target.files;
    const file = files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      // Sprawdzenie, czy rozmiar pliku przekracza 350 KB
      alert('Files under 7mb allowed, current size: ' + file.size + ' bytes');
      this.value = ''; // Wyczyszczenie wybranego pliku
    }
    handleFiles(files);
  });
  function validateFile(file) {
    if (!file) {
      alert('Please select a file.');
      throw new Error('No file selected.');
    }
    const allowedExtensions = ['jpg', 'png', 'jpeg']; // Add more extensions as needed
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert('Invalid file type. Allowed extensions: ' + allowedExtensions.join(', '));

      // Clear file input
      fileInput.value = ''; // Reset the value to clear the file input
      throw new Error('Invalid file type.');
    }
  }
  function handleFiles(files) {
    if (files.length !== 1) {
      alert('Only one file allowed.');
      throw new Error('Only one file allowed.');
    }
    validateFile(files[0]);
    console.log({
      files
    });
    if (!files || files.length === 0) return;
    const file = files[0];
    filenamePreview.textContent = file.name;
    filenamePreview.classList.remove('hidden');
    const dropzone = form.querySelector('.dropzone');
    var targetBgEl = dropzone,
      reader = new FileReader();
    reader.onloadend = function (e) {
      targetBgEl.style['background-image'] = 'url(' + reader.result + ')';
      targetBgEl.style['background-size'] = 'cover';
      targetBgEl.style['background-position'] = 'center';
      targetBgEl.style['background-repeat'] = 'no-repeat';
      targetBgEl.style['background-color'] = 'transparent';
    };
    reader.readAsDataURL(file);
    htmlFormObj[formId].selectedFile = file;
    onFileUpload(file);
    uploadText.classList.add('hidden');
    console.log({
      htmlFormObj
    });
  }
}

/*
document.addEventListener("DOMContentLoaded", function() {
  initUpload();
});
*/
},{}],"IOhO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadApi = void 0;
var _cfg = require("../cfg");
class UploadApi {
  async uploadFile(formData) {
    console.log('uploading file form data');
    console.log(formData);
    return fetch(`${_cfg.uploadApiUrl}/upload`, {
      method: 'POST',
      body: formData
    }).then(response => response.json()).catch(error => {
      console.error('Error:', error);
      alert('Error');
    });
  }
}
const uploadApi = exports.uploadApi = new UploadApi();
},{"../cfg":"WSJK"}],"RKDz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callVideo = callVideo;
exports.getVideo = getVideo;
var _cfg = require("../cfg");
var _utils = require("../utils");
var _api = require("../common/api");
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
  const data = await res.json(); //
  return data; //
}
async function callVideo({
  url,
  mainImg,
  featuresImgs,
  thumbImg,
  logoUrl
}) {
  console.log('callVideo...');
  const data = await (0, _api.apiCall)({
    url,
    mainImg,
    featuresImgs,
    thumbImg,
    logoUrl
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
},{"../cfg":"WSJK","../utils":"K0yk","../common/api":"EzUZ"}],"Tfn9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callMedia = callMedia;
exports.getMedia = getMedia;
var _appState = require("../appState");
var _cfg = require("../cfg");
var _utils = require("../utils");
var _api = require("../common/api");
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
  _appState.appState.mediaEntityId = data.id;
  if (_cfg.shouldDelay) {
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  const resData = await (0, _api.poll)(data.id, async () => getMedia(data.id));
  return resData;
}
},{"../appState":"rHxW","../cfg":"WSJK","../utils":"K0yk","../common/api":"EzUZ"}],"bQE1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doVideoStuff = doVideoStuff;
exports.generateVideo = generateVideo;
exports.onGenerateVideoClick = onGenerateVideoClick;
exports.proceedWithVideoPreparationStuff = proceedWithVideoPreparationStuff;
exports.proceedWithVideoStuff = proceedWithVideoStuff;
var _cfg = require("../cfg");
var _appState = require("../appState");
var _uploadApi = require("../upload/upload-api");
var _consts = require("../consts");
var _video = require("./video.api");
var _media = require("../media/media.api");
var _upload = require("../upload/upload");
var _templates = require("../templates");
function proceedWithVideoPreparationStuff(data) {
  const dataContainer = document.getElementById('data-container');
  const template = _templates.templates.get('video-prep');
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
      mainImgServingUrl: _cfg.apiUrl + data.json.pageResources.mainImgServingUrl,
      logoImgServingUrl: _cfg.apiUrl + data.json.pageResources.logoImgServingUrl
    },
    generatedImages: parsedImages
  });
  dataContainer.innerHTML = html;
  document.getElementById('loading-succ').classList.remove('hidden');
  document.getElementById('image-item-0').classList.add('selected');
  _appState.appState.vid.entering.servingUrl = _cfg.apiUrl + data.json.pageResources.mainImgServingUrl;
  //gen-vid-btn
  const btn = document.getElementById('gen-vid-btn');
  (0, _upload.initUpload)('upload-form1', file => {
    _appState.appState.vid.feature1File = file;
  });
  (0, _upload.initUpload)('upload-form2', file => {
    _appState.appState.vid.feature2File = file;
  });
  _appState.appState.vid.logoUrl = _cfg.apiUrl + data.json.pageResources.logoImgServingUrl;
  _appState.appState.vid.mainImg = _cfg.apiUrl + data.json.pageResources.mainImgServingUrl;
  btn.addEventListener('click', async function () {
    await onGenerateVideoClick(btn, data);
  });
}
async function doVideoStuff(url) {
  _appState.appState.queriedUrl = url;
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');
  const name = _consts.funnyNames[Math.floor(Math.random() * _consts.funnyNames.length)];
  document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;
  document.getElementById('loading-succ').classList.add('hidden');
  // delay 1000 s
  //await new Promise(resolve => setTimeout(resolve, 1000000));
  await (0, _media.callMedia)(url).then(data => {
    console.log('callMedia done', {
      res: data
    }); //
    proceedWithVideoPreparationStuff(data);
  }).finally(() => {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('inputs').classList.remove('hidden');
    document.getElementById('input').value = _appState.appState.queriedUrl;
  });
}
function proceedWithVideoStuff(data) {
  const dataContainer = document.getElementById('data-container');
  const template = _templates.templates.get('video');
  // map apiUrl
  const parsed = {
    ...data.json,
    videoUrl: _cfg.apiUrl + data.json.videoServingUrl
  };
  console.log({
    parsed
  });
  const html = template(parsed);
  dataContainer.innerHTML = html;
  document.getElementById('loading-succ').classList.remove('hidden');
}
async function generateVideo({
  url,
  mainImg,
  featuresImgs,
  thumbImg,
  logoUrl
}) {
  console.log('generateVideo', {
    mainImg,
    featuresImgs,
    thumbImg
  });
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');
  const name = _consts.funnyNames[Math.floor(Math.random() * _consts.funnyNames.length)];
  document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;
  document.getElementById('loading-succ').classList.add('hidden');
  // delay 1000 s
  //await new Promise(resolve => setTimeout(resolve, 1000000));
  await (0, _video.callVideo)({
    url,
    mainImg,
    featuresImgs,
    thumbImg,
    logoUrl
  }).then(data => {
    console.log('callVideo done', {
      res: data
    });
    proceedWithVideoStuff(data);
  }).finally(() => {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('inputs').classList.remove('hidden');
    document.getElementById('input').value = _appState.appState.queriedUrl;
  });
}
async function onGenerateVideoClick(btn, data) {
  const url = (document.getElementById('input').value || '').trim();
  if (!url) {
    return;
  }
  btn.disabled = true;

  //const mainImg = data.json.pageResources.mainImgResourceId;
  //const thumbImg = data.json.generatedImages.imageIds[0];
  const mainImg = _cfg.apiUrl + data.json.pageResources.mainImgServingUrl;
  const thumbImg = _appState.appState.vid.entering.servingUrl; //data.json.generatedImages.servingUrls[0];
  const featuresImgsRaw = [_appState.appState.vid.feature1File, _appState.appState.vid.feature2File].filter(e => e);
  const logoUrl = _cfg.apiUrl + data.json.pageResources.logoImgServingUrl;
  // trzebaby tu callnac upload api, upnac obrazki i zwrócić urle
  const featuresImgs = [];
  for (const fimg of featuresImgsRaw) {
    const formData = new FormData();
    formData.append('file', fimg);
    const {
      filename
    } = await _uploadApi.uploadApi.uploadFile(formData);
    const servingUrl = `${_cfg.uploadApiUrl}/file/${filename}`;
    featuresImgs.push(servingUrl);
  }
  await generateVideo({
    logoUrl,
    mainImg,
    featuresImgs,
    thumbImg,
    url
  }).finally(() => {
    btn.disabled = false;
  });
}
},{"../cfg":"WSJK","../appState":"rHxW","../upload/upload-api":"IOhO","../consts":"XeAP","./video.api":"RKDz","../media/media.api":"Tfn9","../upload/upload":"AlRU","../templates":"j0QR"}],"iPk8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doMediaStuff = doMediaStuff;
exports.proceedWithMediaStuff = proceedWithMediaStuff;
var _cfg = require("../cfg");
var _appState = require("../appState");
var _upload = require("../upload/upload");
var _video = require("../video/video.service");
var _consts = require("../consts");
var _media = require("./media.api");
var _templates = require("../templates");
function proceedWithMediaStuff(data) {
  const dataContainer = document.getElementById('data-container');
  const template = _templates.templates.get('media');
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
      mainImgServingUrl: _cfg.apiUrl + data.json.pageResources.mainImgServingUrl,
      logoImgServingUrl: _cfg.apiUrl + data.json.pageResources.logoImgServingUrl
    },
    generatedImages: parsedImages
  });
  dataContainer.innerHTML = html;
  document.getElementById('loading-succ').classList.remove('hidden');
}
async function doMediaStuff(url) {
  _appState.appState.queriedUrl = url;
  document.getElementById('data-container').innerHTML = '';
  document.getElementById('loading').classList.remove('hidden');
  const name = _consts.funnyNames[Math.floor(Math.random() * _consts.funnyNames.length)];
  document.getElementById('loading-text').innerText = `Hey my name is ${name} and I'll work for you today...gimme a sec`;
  document.getElementById('loading-succ').classList.add('hidden');
  // delay 1000 s
  //await new Promise(resolve => setTimeout(resolve, 1000000));
  await (0, _media.callMedia)(url).then(data => {
    console.log('callMedia done', {
      res: data
    }); //
    proceedWithMediaStuff(data);
  }).finally(() => {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('inputs').classList.remove('hidden');
    document.getElementById('input').value = _appState.appState.queriedUrl;
  });
}
},{"../cfg":"WSJK","../appState":"rHxW","../upload/upload":"AlRU","../video/video.service":"bQE1","../consts":"XeAP","./media.api":"Tfn9","../templates":"j0QR"}],"nmR0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMediaBtn = initMediaBtn;
var _media = require("./media.service");
function initMediaBtn() {
  const btnMedia = document.getElementById('go-btn-thumb');
  btnMedia.addEventListener('click', async function () {
    const url = (document.getElementById('input').value || '').trim();
    if (!url) {
      return;
    }
    btnMedia.disabled = true;
    await (0, _media.doMediaStuff)(url, btnMedia).finally(() => {
      btnMedia.disabled = false;
    });
  });
}
},{"./media.service":"iPk8"}],"bWmp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initVidBtn = initVidBtn;
var _video = require("./video.service");
function initVidBtn() {
  const btnVid = document.getElementById('go-btn-vid');
  btnVid.addEventListener('click', async function () {
    const url = (document.getElementById('input').value || '').trim();
    if (!url) {
      return;
    }
    btnVid.disabled = true;
    await (0, _video.doVideoStuff)(url, btnVid).finally(() => {
      btnVid.disabled = false;
    });
  });
}
},{"./video.service":"bQE1"}],"C5kI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.template = void 0;
const template = exports.template = `
<div class="image-gallery thumbs">
    {{#each generatedImages.servingUrls}}
        <div class="image-item" id="image-item-{{@index}}">
            <a href="#" onclick="selectEntering(event, '{{@index}}', '{{this}}')">
                <img src="{{this}}" alt="thumb" class="thumbnail">
            </a>
            <a href="{{this}}" download class="download-link" target="_blank">Download</a>  <!-- Link do pobrania -->
        </div>
    {{/each}}
</div>
`;
},{}],"w5gY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.template = void 0;
const template = exports.template = `
    <h3>Video</h3>
    <div id="video-container">
        {{#if videoUrl}}
            <video id="my-video" width="640" height="360" controls>
                <source src="{{videoUrl}}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <a href="{{videoUrl}}" download class="download-link" target="_blank">Download Video</a>
        {{else}}
            <p>No video available.</p>
        {{/if}}
    </div>`;
},{}],"H5yE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.template = void 0;
const template = exports.template = `

    <h3>Main page</h3>
    <div class="image-item selected">
        <a>  <!-- Link do dużego obrazu w nowej karcie -->
            <img src="{{pageResources.mainImgServingUrl}}" alt="thumb" class="thumbnail">
        </a>
        <a href="{{pageResources.mainImgServingUrl}}" download class="download-link" target="_blank">Download</a>  <!-- Link do pobrania -->
    </div>
    <h3>Logo</h3>
    <div class="image-item selected">
        <a>  <!-- Link do dużego obrazu w nowej karcie -->
            <img src="{{pageResources.logoImgServingUrl}}" alt="thumb" class="thumbnail">
        </a>
        <a href="{{pageResources.logoImgServingUrl}}" download class="download-link" target="_blank">Download</a>  <!-- Link do pobrania -->
    </div>
    <h3>Entering picture</h3>
    <div class="image-gallery thumbs">
        {{#each generatedImages.servingUrls}}
            <div class="image-item" id="image-item-{{@index}}">
                <a href="#" onclick="selectEntering(event, '{{@index}}', '{{this}}')">
                    <img src="{{this}}" alt="thumb" class="thumbnail">
                </a>
                <a href="{{this}}" download class="download-link" target="_blank">Download</a>  <!-- Link do pobrania -->
            </div>
        {{/each}}
    </div>
    <h3>App features screens</h3>
    <div class="flex two">
        <form class="upload-form" id="upload-form1">
            <div class="flex one center dropzone" enctype="multipart/form-data" class="dropzone">
                <label for="file1" class="the-label flex-center">
                    <div class="upload-text">
                        <button type="button" class="btn btn-primary button submit">Upload feature 1 screen
                        </button>
                    </div>
                    <span class="filename-preview hidden"></span>
                </label>
                <input type="file" name="file" class="file hidden" accept="image/*" id="file1" >
            </div>
        </form>
        <form class="upload-form" id="upload-form2" style="margin-left:20px;">
            <div class="flex one center dropzone" enctype="multipart/form-data" class="dropzone">
                <label for="file2"  class="the-label flex-center">
                    <div class="upload-text">
                        <button type="button" class="btn btn-primary button submit">Upload feature 2 screen
                        </button>
                    </div>
                    <span class="filename-preview hidden" ></span>
                </label>
                <input type="file" name="file" class="file hidden"  accept="image/*" id="file2">
            </div>
        </form>
    </div>

    <button class="btn btn-primary" id="gen-vid-btn">Generate video</button>
    <div id="video-output"></div>
`;
},{}],"UXYh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.template = void 0;
const template = exports.template = `

    <p><strong>URL:</strong> <a href="{{url}}" target="_blank">{{url}}</a></p>
    <section>
        <h2 class="section-title">What your page offers:</h2>
        <p>{{desc}}</p>
    </section>

    <div class="meta" >
        <section>
            <h2 class="section-title">Keywords</h2>
            <ul class="keyword-list">
                {{#each keywords}}
                    <li>{{this}}</li>
                {{/each}}
            </ul>
        </section>

        <section>
            <h2 class="section-title">Features</h2>
            <ul class="func-list">
                {{#each funcs}}
                    <li>{{this}}</li>
                {{/each}}
            </ul>
        </section>
    </div>
    <section class="hashtags">

        <div class="accordion" id="hashtagsAccordion">
            <div class="accordion-item" style="border:none;">
                <h2 class="accordion-header" id="headingHashtags" style="padding:0;">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" style="padding-left:0;"
                            data-bs-target="#collapseHashtags" aria-expanded="false" aria-controls="collapseHashtags">
                        <h2 class="section-title">Hashtags</h2>
                    </button>
                </h2>
                <div id="collapseHashtags" class="accordion-collapse collapse" aria-labelledby="headingHashtags"
                     data-bs-parent="#hashtagsAccordion">
                    <div class="accordion-body">
                        {{#if hashtags}}

                            {{#if hashtags.twitter}}
                                <p>Twitter:
                                    {{#each hashtags.twitter}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                            {{#if hashtags.instagram}}
                                <p>Instagram:
                                    {{#each hashtags.instagram}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                            {{#if hashtags.tikTok}}
                                <p>TikTok:
                                    {{#each hashtags.tikTok}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                            {{#if hashtags.medium}}
                                <p>Medium:
                                    {{#each hashtags.medium}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                            {{#if hashtags.devTo}}
                                <p>Dev.to:
                                    {{#each hashtags.devTo}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                            {{#if hashtags.hackerNews}}
                                <p>Hacker News:
                                    {{#each hashtags.hackerNews}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                            {{#if hashtags.youtube}}
                                <p>YouTube:
                                    {{#each hashtags.youtube}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                        {{else}}
                            <p>No hashtags found.</p>
                        {{/if}}
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <h2 class="section-title">Reddit Posts</h2>
        <div class="small-text">
            Free version is limited. Full access is 4.99$.
        </div>
        {{#each posts}}
            <div class="subreddit-section">
                <h3 class="subr"><a target="_blank" href="https://reddit.com/r/{{@key}}">/r/{{@key}}</a></h3>
                <ul class="post-list">
                    {{#each this}}
                        <li>
                            <a class="post-link" href="{{href}}" onclick="goToLink(event, '{{href}}')">{{title}}</a>
                            <span class="post-votes">({{votes}} votes)</span>
                            <p>{{truncate text 200}}</p>


                            <div class="{{#ifEq href "Unlock"}}hidden{{/ifEq}}">
                                <p class="summary"><b>Summary:</b> {{reason}}</p>
                                <p class="answer">
                                    <b>Your answer:</b>
                                    <button onclick="showAnswer('{{subr}}-{{@index}}', this)">Show</button>
                                    <span id="answer-{{subr}}-{{@index}}" class="hidden">
                                        (<span class="small-text">Click text to copy</span>)
                                        <span onclick="copyToClipboard(this)">{{answer}}</span>
                                    </span>
                                </p>
                            </div>
                        </li>
                    {{/each}}
                </ul>
            </div>
        {{/each}}
    </section>


    <!--<section>
        <h2 class="section-title">Other stuff you prolly wanna use:</h2>
    </section>-->


    <section>
        <h2 class="section-title">Subreddits related to your app</h2>
        <div class="small-text">
            Free version is limited. Full access is 4.99$.
        </div>
        <ul class="sub-list">
            {{#each subs}}
                <li><a href="{{link}}" onclick="goToLink(event, '{{link}}')" target="_blank">{{name}}</a> ({{fNum users}} users)</li>
            {{/each}}
        </ul>
    </section>
`;
},{}],"OLWW":[function(require,module,exports) {
"use strict";

var _cfg = require("./cfg");
require("./window.js");
var _reddit = require("./reddit/reddit.init");
var _media = require("./media/media.init");
var _vide = require("./video/vide.init");
var _reddit2 = require("./reddit/reddit.service");
var _media2 = require("./templates/components/media");
var _video = require("./templates/components/video");
var _videoPrep = require("./templates/components/video-prep");
var _reddit3 = require("./templates/components/reddit");
var _templates = require("./templates");
//const host = 'http://localhost:3000';

function registerTemplates() {
  _templates.templates.register('media', _media2.template);
  _templates.templates.register('video', _video.template);
  _templates.templates.register('video-prep', _videoPrep.template);
  _templates.templates.register('reddit', _reddit3.template);
}
async function initApp() {
  //
  console.log('DOMContentLoaded init...');

  // check for url query param token and save to session storage and remove from url
  const urlParams = new URLSearchParams(window.location.search);
  // paymentSuccess

  document.getElementById('input').value = _cfg.defaultInput;
  (0, _reddit.initRedditBtn)();
  (0, _media.initMediaBtn)(); //
  (0, _vide.initVidBtn)();
  registerTemplates();
  const token = urlParams.get('token');
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
    await (0, _reddit2.getPreparedResults)(url, token, entityId);
  }
  const btnVid = document.getElementById('go-btn-vid');
  const btnThumb = document.getElementById('go-btn-thumb');
  if ("false" === 'true') {
    btnVid.classList.remove('hidden');
    btnThumb.classList.remove('hidden');
  }
}
document.addEventListener('DOMContentLoaded', async function () {
  await initApp();
});
},{"./cfg":"WSJK","./window.js":"DHZK","./reddit/reddit.init":"Gfrc","./media/media.init":"nmR0","./video/vide.init":"bWmp","./reddit/reddit.service":"Ofbo","./templates/components/media":"C5kI","./templates/components/video":"w5gY","./templates/components/video-prep":"H5yE","./templates/components/reddit":"UXYh","./templates":"j0QR"}]},{},["OLWW"], null)