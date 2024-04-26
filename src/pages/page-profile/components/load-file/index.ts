import Block from "src/reactivity/block";

import css from "./style.module.css";

export default class LoadFile extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        click: () => console.log("load"),
      },
    });
  }
  render(): string {
    return `
      <input type="file" id="file" class="${css.input}" accept="image/png, image/jpeg"  />
    `;
  }
}
