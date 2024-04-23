import Block from "src/reactivity/block";

import css from "./style.module.css";

type Props = {
  name: string;
};

export default class ProfileEditInput extends Block {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return `
      <input
        name="{{ name }}"
        type="text"
        class="${css.edit}"
      />
    `;
  }
}
