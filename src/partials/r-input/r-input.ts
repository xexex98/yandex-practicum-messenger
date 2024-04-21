import Block from "src/reactivity/block";

import styles from "./style.module.css";

export default class RInputElement extends Block {
  constructor(props) {
    super(props);
  }

  render(): string {
    return `
      <input
        name="{{ name }}"
        id="{{ name }}"
        class="${styles.input} {{class}}"
      />
        `;
  }
}
