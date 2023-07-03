import React from "react";
// react v.18부터 "react-dom/client"에서 createRoot를 사용하라고 권장함
import { createRoot } from "react-dom/client";
import App from "./app";

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
