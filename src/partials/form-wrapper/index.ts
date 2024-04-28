import Block from "src/core/block";

import css from "./style.module.css";

type TProps = {
  title: string;
  body: Block;
};

export default class FormWrapper extends Block {
  constructor(props: TProps) {
    super(props);
  }

  render() {
    return `
      <form
        class="${css.form}"
      >
        <h3 class="${css.title}">{{ title }}</h3>
        {{{ body }}}
      </form>
    `;
  }
}
