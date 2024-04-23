import Block from "src/reactivity/block";

import css from "./style.module.css";

type Props = {
  label: string;
  value: string;
};

export default class ProfileInfoField extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): string {
    return `
      <div class="${css.field}">
        <p>{{ label }}</p>
        <p>{{ value }}</p>
      </div>
    `;
  }
}
