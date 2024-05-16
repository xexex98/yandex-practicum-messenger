import Block from "src/core/block";
import controller from "src/pages/page-chat/controller";

import css from "./style.module.css";

export default class NewMessageSend extends Block {
  constructor() {
    super({
      events: {
        click: () => {
          if (this.props.msg) {
            const inputField = document.getElementById("message") as HTMLInputElement;

            controller.sendMessage(this.props.msg as string);

            if (inputField) {
              inputField.value = "";
            }
            this.setProps({ msg: "" });
          }
        },
      },
    });
  }
  render(): string {
    return `
      <button id="sendMsg" class="${css.circle}">
        <span class="${css.arrow}">&#8594;</span>
      </button>
    `;
  }
}
