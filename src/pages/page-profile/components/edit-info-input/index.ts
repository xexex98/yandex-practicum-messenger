import Block from "src/reactivity/block";

import css from "./style.module.css";

type Props = {
  name: string;
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
