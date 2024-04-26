import Handlebars from "handlebars";

import { registerPartial } from "./init/register-partials";
import pages, { TPages } from "./routes";

import "./style.css";

registerPartial();

function navigate(page: TPages) {
  const [source, context] = pages[page];
  const container = document.getElementById("app");
  const nav = document.getElementById("nav");

  if (source instanceof Object) {
    const page = new source(context);

    if (nav) {
      nav.remove();
    }

    container?.append(page.getContent() as Node);
    return;
  }

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
