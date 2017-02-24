(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by littlestone on 2017/2/10.
 */

var WsResource = (function () {
    function WsResource(wsUrl) {
        this.socketOpen = false;
        this.socket = {};
        this.connect(wsUrl);
        this.listen();
        this.afterConnect();
    }
    WsResource.prototype.listen = function () {
        var _that = this;
        return new Promise(function (resolve, reject) {
            _that.socket.onopen(function (event) {
                _that.socketOpen = true;
                console.log('WebSocket opened：', event);
                resolve(event);
            });
            _that.socket.onerror(function (event) {
                console.error('Can not open WebSocket, please check...！', event);
                resolve(event);
            });
        });
    };
    WsResource.prototype.connect = function (wsUrl) {
        this.socket = new WebSocket(wsUrl);
        return this;
    };
    WsResource.prototype.afterConnect = function (resolve, reject) {
        this.socket.onmessage(function (res) {
            console.log("Get data from webSocket server：", JSON.parse(res.data));
            resolve(JSON.parse(res.data));
        });
        return this;
    };
    //发送消息
    WsResource.prototype.sendMsg = function (reqObj, method) {
        var _that = this;
        var WsResource = this;
        if (WsResource.socketOpen) {
            var header = {};
            var token = reqObj.token;
            if (token === undefined) {
                console.log("no token");
                header = {
                    "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6)
                };
            }
            else if (token !== undefined) {
                console.log("get token");
                header = {
                    "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6),
                    "Authentication": "Bearer " + token
                };
            }
            _that.socket.send({
                data: JSON.stringify({
                    "method": method,
                    "url": reqObj.url,
                    "header": header,
                    "body": JSON.stringify(reqObj.data)
                }),
                success: function (res) {
                    console.log("Send data success: ", res);
                },
                fail: function (res) {
                    console.log("Send data fail: ", res);
                }
            });
        }
        else {
            console.log("websocket server not opened");
        }
    };
    WsResource.prototype.get = function (url, token) {
        var _that = this;
        var reqObj = this.handleParams(url, {}, token);
        setTimeout(function () {
            _that.sendMsg(reqObj, "GET");
        }, 300);
        return new Promise(function (resolve, reject) {
            _that.afterConnect(resolve, reject);
        });
    };
    WsResource.prototype.post = function (url, data, token) {
        var _that = this;
        var reqObj = this.handleParams(url, data, token);
        setTimeout(function () {
            _that.sendMsg(reqObj, "POST");
        }, 300);
        return new Promise(function (resolve, reject) {
            _that.afterConnect(resolve, reject);
        });
    };
    WsResource.prototype.update = function (url, data) {
        var _that = this;
        var reqObj = this.handleParams(url, data);
        setTimeout(function () {
            _that.sendMsg(reqObj, "UPDATE");
        }, 300);
        return new Promise(function (resolve, reject) {
            _that.afterConnect(resolve, reject);
        });
    };
    WsResource.prototype.delete = function (url, data) {
        var _that = this;
        var reqObj = this.handleParams(url, data);
        setTimeout(function () {
            _that.sendMsg(reqObj, "DELETE");
        }, 300);
        return new Promise(function (resolve, reject) {
            _that.afterConnect(resolve, reject);
        });
    };
    WsResource.prototype.handleParams = function (url, data, token) {
        var reqObj = {};
        reqObj['url'] = url;
        reqObj['data'] = data;
        reqObj['token'] = token;
        return reqObj;
    };
    return WsResource;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WsResource;


/***/ })
/******/ ]);
});