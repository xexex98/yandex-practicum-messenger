import Block from "src/core/block";
import isEqual from "src/helpers/is-equal";
import ErrorLine from "src/partials/r-input/error-line";
import RInputElement from "src/partials/r-input/r-input";

import styles from "./style.module.css";

type TProps = {
  name: string;
  label: string;
  type: string;
  error?: boolean;
  errorText?: string;
  onBlur: (e?: Event) => void;
};

export default class RInput extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      Input: new RInputElement(props),
      ErrorLine: new ErrorLine({
        errorText: props.errorText || "",
      }),
    });
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
    if (isEqual(oldProps, newProps)) {
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
