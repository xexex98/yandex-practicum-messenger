import Block from "src/core/block";
import controller from "src/pages/page-chat/controller";

import css from "./style.module.css";

export default class NewMessageSend extends Block {
  constructor() {
    super({
      events: {
        click: () => controller.sendMessage(this.props.msg as string),
      },
    });
  }
  render(): string {
    return `
      <div class="${css.circle}">
        <span class="${css.arrow}">&#8594;</span>
      </div>
    `;
  }
}
