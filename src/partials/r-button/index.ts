import Block from "../../core/block";

import styles from "./style.module.css";

type TProps = {
  text: string;
  type?: string;
  onClick: (e: Event) => void;
  events?: Record<string, EventListener>;
};

export default class RButton extends Block {
  constructor(props: TProps) {
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
