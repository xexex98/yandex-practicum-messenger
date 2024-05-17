import Block from "src/core/block";
import NewMessageInput from "src/pages/page-chat/components/new-message-input";
import NewMessageSend from "src/pages/page-chat/components/new-message-send";

import css from "./style.module.css";

export default class NewMessage extends Block {
  constructor() {
    super({
      Input: new NewMessageInput({
        events: {
          input: (e: Event) => {
            this.children.Send.setProps({ msg: (e.target as HTMLInputElement).value });
          },
          keydown: (e: Event) => {
            if ((e as KeyboardEvent).key === "Enter") {
              this.children.Send.setProps({ msg: (e.target as HTMLInputElement).value });

              const send = document.getElementById("sendMsg");

              send?.click();
            }
          },
        },
      }),
      Send: new NewMessageSend(),
    });
  }
  render(): string {
    return `
      <div class="${css.container}">
        {{{ Input }}}
        {{{ Send }}}
      </div>
    `;
  }
}
