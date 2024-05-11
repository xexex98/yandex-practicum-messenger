import Block from "src/core/block";

import css from "./style.module.css";

export default class ButtonLink extends Block {
  constructor(props) {
    super(props);
  }

  public render(): string {
    return `
      <button class="${css.button}">{{ text }}</button>
    `;
  }
}
