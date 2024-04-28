import Block from "src/core/block";

import css from "./style.module.css";

type TProps = {
  name: string;
  msg: string;
  date: string;
  unread: string;
};

export default class Dialog extends Block {
  constructor(props: TProps) {
    super(props);
  }

  render(): string {
    return `
      <div class="${css.dialog}">
        <div class="${css.border}"></div>
        <div class="${css.avatar}"></div>
        <div class="${css.content}">
          <p class="${css.user}">{{ name }}</p>
          <p class="${css.message}">{{ msg }}</p>
        </div>
        <div class="${css.info}">
          <p class="${css.time}">{{ date }}</p>
          <p class="${css.unread}">{{ unread }}</p>
        </div>
      </div>
    `;
  }
}
