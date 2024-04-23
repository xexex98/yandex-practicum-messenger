import Block from "src/reactivity/block";

import css from "./style.module.css";

type Props = {
  name: string;
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
        <input
          name="{{ name }}"
          type="text"
          class="${css["field-input"]}"
        />
        <p>{{ label }}</p>
        <p>{{ value }}</p>
      </div>
    `;
  }
}
