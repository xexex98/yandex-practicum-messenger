import { JSDOM } from "jsdom";
import sinon from "sinon";

const jsdom = new JSDOM(`<body></body>`);

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
