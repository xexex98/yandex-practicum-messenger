import Block from "src/reactivity/block";

import css from "./style.module.css";

export default class FormWrapper extends Block {
  constructor(props) {
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
