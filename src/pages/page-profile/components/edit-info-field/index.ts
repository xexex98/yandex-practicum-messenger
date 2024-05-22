import Block from "src/core/block";
import ProfileEditInput from "src/pages/page-profile/components/edit-info-input";
import ErrorLine from "src/partials/r-input/error-line";

import css from "./style.module.css";

type TProps = {
  label: string;
  name: string;
  type?: string;
  onBlur: (e: Event) => void;
  error?: boolean;
  errorText?: string;
};

export default class ProfileEditInfoField extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      Input: new ProfileEditInput({
        ...props,
        events: {
          blur: props.onBlur,
        },
      }),
      ErrorLine: new ErrorLine(),
    });
  }

  render() {
    return `
      <div class="${css.field}">
        <label for={{name}} class="${css.label}" >
          {{ label }}
          {{{ Input }}}
        </label>
        {{{ ErrorLine }}}
      </div>
    `;
  }
}
