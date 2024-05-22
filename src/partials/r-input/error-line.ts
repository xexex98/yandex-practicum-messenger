import Block from "src/core/block";

import css from "./style.module.css";

export default class ErrorLine extends Block {
  render(): string {
    return `
        <div class="{{#if error}}input-error{{/if}}">
          <div class="${css.error}">{{ errorText }}</div>
        </div>
      `;
  }
}
