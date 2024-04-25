import HeaderMenu from "src/pages/page-chat/components/header-menu";
import UserModal from "src/pages/page-chat/components/user-modal";
import Block from "src/reactivity/block";

import css from "./style.module.css";

export default class Kebab extends Block {
  init(): void {
    // console.log(this);
  }
  constructor(props) {
    super({
      ...props,
      events: {
        click: () => this.props.onShow(),
      },
    });
  }

  render(): string {
    return `
      <div class="${css.kebab}">
        <svg
          width="3"
          height="16"
          viewBox="0 0 3 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="1.5"
            cy="2"
            r="1.5"
            fill="rgb(var(--primary-color))"
          />
          <circle
            cx="1.5"
            cy="8"
            r="1.5"
            fill="rgb(var(--primary-color))"
          />
          <circle
            cx="1.5"
            cy="14"
            r="1.5"
            fill="rgb(var(--primary-color))"
          />
        </svg>
      </div>
    `;
  }
}
