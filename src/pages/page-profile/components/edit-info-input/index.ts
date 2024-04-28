import Block from "src/core/block";

import css from "./style.module.css";

type Props = {
  name: string;
  type?: string;
  events?: Record<string, EventListener>;
};

export default class ProfileEditInfoInput extends Block {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return `
      <input
        name="{{ name }}"
        id="{{ name }}"
        type={{ type }}
        class="${css.edit}"
      />
    `;
  }
}
