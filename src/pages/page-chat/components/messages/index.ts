import Block from "src/core/block";
import connect from "src/core/connect";

import css from "./style.module.css";

class Messages extends Block {
  public render(): string {
    return `
      <div id="messages" class="${css.messages}">
        {{#each messages}}
          <div class="${css.msg}">
            <p>{{{ user_id }}}: {{{ content }}}</p>
          </div>
        {{/each}}
      </div>
    `;
  }
}

export default connect(({ userID, messages }) => ({
  userID,
  messages,
}))(Messages);
