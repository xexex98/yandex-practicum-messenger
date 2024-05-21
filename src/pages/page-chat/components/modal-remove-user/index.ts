import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import isEqual from "src/helpers/is-equal";
import { chats } from "src/pages/page-chat/controller/chats";
import { ApiError, RButton, RInput } from "src/partials";

import css from "./style.module.css";

class ModalRemoveUser extends Block {
  public onChangeInput(e: Event) {
    const target = e.target as HTMLInputElement;

    this.children.Remove.setProps({ id: target.value });
  }

  public init(): void {
    const onChangeInputBind = this.onChangeInput.bind(this);

    const Input = new RInput({
      label: "Id пользователя",
      name: "id",
      type: "text",
      events: {
        input: onChangeInputBind,
      },
    });

    const Remove = new RButton({
      text: "Удалить",
      type: "submit",
      disabled: false,
      events: {
        click: async (e) => {
          e.preventDefault();
          const id = this.children.Remove.props.id as string;
          const chatId = store.getState().chatId as number;

          await chats.deleteUsersFromChat({ users: [Number(id)], chatId });

          if (typeof this.props.close === "function" && this.props.deleteUserError !== true) {
            this.props.close();
          }
        },
      },
    });

    const Error = new ApiError();

    this.children = {
      ...this.children,
      Error,
      Input,
      Remove,
    };
  }

  public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    this.children.Remove.setProps({ disabled: store.getState().loading });
    return true;
  }

  public render(): string {
    return `
      <form action="#">
        {{{ Input }}}
        <div class="${css.buttons}"}>
          {{{ Remove }}}
          {{#if deleteUserError}}
            {{{ Error }}}
          {{/if}}
        </div>
      </form>
    `;
  }
}

export default connect(({ deleteUserError, loading }) => ({ deleteUserError, loading }))(
  ModalRemoveUser
);
