import Handlebars from "handlebars";

import { registerPartial } from "./init/register-partials";
import Block from "./reactivity";
import pages, { TPages } from "./routes";

import "./style.css";

registerPartial();
class Button extends Block {
  props;
  constructor(props) {
    super("button", props);
    this.props = props;
  }

  render() {
    return Handlebars.compile("<div>{{text}}</div>")({ ...this.props });
  }
}
function navigate(page: TPages) {
  const [source, context] = pages[page];
  const container = document.getElementById("app");
  const button = new Button({
    text: "Click me12",
  });

  container.innerHTML = console.log(button.render());

  // if (container) {
  // container.innerHTML = Handlebars.compile(source)(context);
  // }
}
document.addEventListener("DOMContentLoaded", () => navigate("404"));

document.addEventListener("click", (e) => {
  const target = e.target as HTMLLinkElement;
  const page = target.getAttribute("page") as TPages;

  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
