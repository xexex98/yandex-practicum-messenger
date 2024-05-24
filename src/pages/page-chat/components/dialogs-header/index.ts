import Block from "src/core/block";
import router from "src/core/router";
import ModalAddChat from "src/pages/page-chat/components/modal-add-chat";
import SearchInput from "src/pages/page-chat/components/search-input";
import { ButtonLink, Modal } from "src/partials";

import css from "./style.module.css";

export default class DialogsHeader extends Block {
  onCreate() {
    this.children.ModalAdd.setProps({ show: true });
  }

  onClose() {
    this.children.ModalAdd.setProps({ show: false });
  }

  public init(): void {
    const onCreateBind = this.onCreate.bind(this);
    const onCloseBind = this.onClose.bind(this);

    const ModalAdd = new Modal({
      show: false,
      title: "Добавить чат",
      body: new ModalAddChat({ close: onCloseBind }),
    });

    const AddChat = new ButtonLink({
      text: "Создать чат +",
      type: "button",
      events: { click: onCreateBind },
    });

    const Profile = new ButtonLink({
      text: "Профиль >",
      type: "button",
      events: { click: () => router.go("/settings") },
    });
    const Input = new SearchInput();

    this.children = {
      ...this.children,
      ModalAdd,
      AddChat,
      Profile,
      Input,
    };
  }

  render(): string {
    return `
      <div class="${css.header}">
        <div class="${css.goto}">
          {{{ ModalAdd }}}
          {{{ AddChat }}}
          {{{ Profile }}}
        </div>
        {{{ Input }}}
      </div>
    `;
  }
}
