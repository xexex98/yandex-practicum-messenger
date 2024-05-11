import Block from "src/core/block";

import styles from "./style.module.css";

type TProps = {
  name: string;
  type: string;
  onBlur: (e?: Event) => void;
  class?: string;
};

export default class RInputElement extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  render(): string {
    return `
      <input
        name="{{ name }}"
        id="{{ name }}"
        type="{{ type }}"
        class="${styles.input} {{ class }}"
      />
    `;
  }
}
