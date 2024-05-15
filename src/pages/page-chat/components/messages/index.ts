import Block from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";

import css from "./style.module.css";

// Message3: new ChatMessage({
//   content: "Привет!",
//   type: "is-out",
// }),
class Messages extends Block {
  public render(): string {
    console.log("render");
    // if (Array.isArray(store.getState().messages)) {
    //   const messages = store.getState().messages.reverse();

    //   this.setProps({ messages });
    // }
    console.log(this.props);
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
