"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// # babel02 만들고
// npm init -y
// npm install @babel/core @babel/cli @babel/preset-env
// npm install @babel/plugin-transform-modules-commonjs

// ES6 문법으로 작성

const app = (0, _express.default)();
app.listen(3000, () => {
  console.log("server on~");
});

// npx babel server.js --out-file dist/server.js
