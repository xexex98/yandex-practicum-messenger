import Block from "src/core/block";
import isEqual from "src/helpers/is-equal";

import css from "./style.module.css";

type TProps = {
  errorText: string;
};

export default class ErrorLine extends Block {
  constructor(props: TProps) {
    super(props);
  }

  render(): string {
    return `
        <div class="${css.error}">{{ errorText }}</div>
      `;
  }
}
