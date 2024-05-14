import Block from "src/core/block";

import styles from "./style.module.css";

type TProps = {
  name: string;
  type: string;
  events?: Record<string, EventListener>;
  class?: string;
};

export default class RInputElement extends Block {
  constructor(props: TProps) {
    super(props);
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
