import { JSDOM } from "jsdom";
import sinon from "sinon";

const jsdom = new JSDOM(`<body id="app"></body>`, {
  url: "http://localhost:3000/",
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.history = jsdom.window.history;
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
