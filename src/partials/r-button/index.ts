import Block from "../../reactivity/block";

import styles from "./style.module.css";

type TRButton = Record<string, unknown>;

export class RButton extends Block {
  constructor(props: TRButton) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return `
      <button
        class="${styles.btn} ${styles["btn-default"]}"
        type="{{ type }}"
      >
        {{ text }}
      </button>
  `;
  }
}
