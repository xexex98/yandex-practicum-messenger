import Handlebars from "handlebars";

import { registerPartial } from "./init/register-partials";
import pages from "./routes";

import "./style.css";

registerPartial();

function navigate(page) {
  const [source, context] = pages[page];
  const container = document.getElementById("app");

  container.innerHTML = Handlebars.compile(source)(context);
}
document.addEventListener("DOMContentLoaded", () => navigate("nav"));

document.addEventListener("click", (e) => {
  const page = e.target.getAttribute("page");

  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
