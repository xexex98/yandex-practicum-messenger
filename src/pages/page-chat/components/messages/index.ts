import Block from "src/core/block";
import connect from "src/core/connect";

import css from "./style.module.css";

// Message3: new ChatMessage({
//   content: "Привет!",
//   type: "is-out",
// }),
class Messages extends Block {
  public render(): string {
    if (Array.isArray(this.props.messages)) {
      const messages = this.props.messages.reverse();

      this.setProps({ messages });
    }

    return `
      <div class="${css.messages}">
        {{#each messages}}
          <div class="${css.msg} ">
            <p>{{{ content }}}</p>
          </div>
        {{/each}}
      </div>
    `;
  }
}

export default connect(({ user_ID, messages }) => ({
  user_ID,
  messages,
}))(Messages);
