import ProfileEditInput from "src/pages/page-profile/components/edit-info-input";
import Block from "src/reactivity/block";

import css from "./style.module.css";

type Props = {
  label: string;
  name: string;
};

export default class ProfileEditInfoField extends Block {
  constructor(props: Props) {
    super({
      ...props,
      Input: new ProfileEditInput({ name: "test" }),
    });
  }

  render() {
    return `
      <div class="${css.field}">
        <p>{{ label }}</p>
        {{{ Input }}}
      </div>
    `;
  }
}
