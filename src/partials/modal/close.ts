import Block from "src/core/block";

import css from "./style.module.css";

export default class CloseModal extends Block {
  public render(): string {
    return `
      <p class="${css.close}">X</p>
    `;
  }
}
