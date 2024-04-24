import { RButton, RInput } from "src/partials";
import Block from "src/reactivity/block";

import css from "./style.module.css";

export default class UserModal extends Block {
  constructor(props) {
    super({
      ...props,
      Input: new RInput({ label: "Логин", error: true, errorText: "error" }),
      Button: new RButton({ text: "Добавить" }),
    });
  }

  render() {
    return `
      <div class="${css.modal}">
        <div class="${css.container}">
          <p class="${css.title}">{{ title }}</p>
            {{{ Input }}}
          <div class="${css.button}">
            {{{ Button }}}
          </div>
        </div>
      </div>
    `;
  }
}
