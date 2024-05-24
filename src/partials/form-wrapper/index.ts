import Block from "src/core/block";
import formError from "src/partials/form-wrapper/form-error";

import css from "./style.module.css";

type TProps = {
  title: string;
  body: Block;
};

export default class FormWrapper extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      Error: new formError(),
      events: {
        submit: (e) => e.preventDefault(),
      },
    });
  }

  render() {
    return `
      <form
        class="${css.form}"
      >
        <h3 class="${css.title}">{{ title }}</h3>
        {{{ body }}}
        {{{ Error }}}
      </form>
    `;
  }
}
