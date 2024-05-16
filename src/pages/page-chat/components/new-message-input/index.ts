import Block from "src/core/block";

import css from "./style.module.css";

export default class NewMessageInput extends Block {
  render(): string {
    return `
      <input
        id="message"
        placeholder="Сообщение"
        type="text"
        class="${css.input}"
      />
    `;
  }
}
