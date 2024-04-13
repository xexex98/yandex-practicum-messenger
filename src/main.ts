import Handlebars from "handlebars";

import { registerPartial } from "./init/register-partials";
import pages, { TPages } from "./routes";

import "./style.css";

registerPartial();

function navigate(page: TPages) {
  const [source, context] = pages[page];
  const container = document.getElementById("app");

  if (container) {
    container.innerHTML = Handlebars.compile(source)(context);
  }
}
document.addEventListener("DOMContentLoaded", () => navigate("nav"));

document.addEventListener("click", (e) => {
  const target = e.target as HTMLLinkElement;
  const page = target.getAttribute("page") as TPages;

  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
