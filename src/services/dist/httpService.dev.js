"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _reactToastify = require("react-toastify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = _axios["default"].create({
  baseURL: imp,
  withCredentials: true
});

app.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (!error.response) {
    if (!_reactToastify.toast.isActive('connectionError')) {
      _reactToastify.toast.error('خطا در برقراری ارتباط با سرور', {
        toastId: 'connectionError'
      });
    }
  }

  return Promise.reject(error);
});
var http = {
  get: app.get,
  post: app.post,
  put: app.put,
  "delete": app["delete"]
};
var _default = http;
exports["default"] = _default;