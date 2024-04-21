import ErrorLine from "src/partials/r-input/error-line";
import RInputElement from "src/partials/r-input/r-input";
import Block from "src/reactivity/block";

import styles from "./style.module.css";

export default class RInput extends Block {
  constructor(props) {
    super({
      ...props,
      Input: new RInputElement({
        ...props,
        events: {
          blur: props.onBlur,
        },
      }),
      ErrorLine: new ErrorLine({
        errorText: props.errorText,
      }),
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps === newProps) {
      return false;
    }

    this.children.ErrorLine.setProps(newProps);

    return true;
  }

  render() {
    return `
      <div
        class="${styles.field} {{#if error}}input-error{{/if}}"
      >
        <label 
          for="{{ name }}"
          class="${styles.label}"
        >
          {{{ Input }}}
          {{ label }}
        </label>
        {{{ ErrorLine }}}
      </div>
    `;
  }
}
