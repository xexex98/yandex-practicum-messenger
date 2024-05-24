import Block from "src/core/block";
import ErrorLine from "src/partials/r-input/error-line";
import RInputElement from "src/partials/r-input/r-input";

import styles from "./style.module.css";

type TProps = {
  name: string;
  label: string;
  type: string;
  error?: boolean;
  errorText?: string;
  events?: Record<string, EventListener>;
};

export default class RInput extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      Input: new RInputElement(props),
      ErrorLine: new ErrorLine(props),
    });
  }

  render() {
    return `
      <div
        class="${styles.field}"
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
