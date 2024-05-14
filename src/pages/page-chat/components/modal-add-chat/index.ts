import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import isEqual from "src/helpers/is-equal";
import { chats } from "src/pages/page-chat/controller/chats";
import { ApiError, RButton, RInput } from "src/partials";

import css from "./style.module.css";

class ModalAddChat extends Block {
  onChangeInput(e: Event) {
    const target = e.target as HTMLInputElement;

    this.children.Add.setProps({ title: target.value });
  }

  public init(): void {
    const onChangeInputBind = this.onChangeInput.bind(this);

    const Input = new RInput({
      label: "Название чата",
      name: "chat",
      type: "text",
      events: {
        input: onChangeInputBind,
      },
    });

    const Add = new RButton({
      text: "Добавить",
      type: "submit",
      disabled: false,
      onClick: async (e) => {
        e.preventDefault();
        const title = this.children.Add.props.title as string;

        await chats.createChat(title);

        if (typeof this.props.close === "function" && this.props.createChatError !== true) {
          this.props.close();
        }
      },
    });

    const Error = new ApiError();

    this.children = {
      ...this.children,
      Error,
      Input,
      Add,
    };
  }

  public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    this.children.Add.setProps({ disabled: store.getState().loading });
    return true;
  }

  public render(): string {
    return `
      <form action="#">
        {{{ Input }}}
        <div class="${css.buttons}"}>
          {{{ Add }}}
          {{#if createChatError}}
            {{{ Error }}}
          {{/if}}
        </div>
      </form>
    `;
  }
}

export default connect(({ createChatError, loading }) => ({ createChatError, loading }))(
  ModalAddChat
);
