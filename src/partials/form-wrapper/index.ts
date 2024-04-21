import Block from "src/reactivity/block";

import styles from "./style.module.css";

export default class FormWrapper extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return `
      <form
        action="#"
        class="${styles.form}"
      >
        <h3 class="${styles.title}">{{title}}</h3>
        {{{ body }}}
      </form>
    `;
  }
}
