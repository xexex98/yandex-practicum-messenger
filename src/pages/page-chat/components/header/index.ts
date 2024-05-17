import Block from "src/core/block";
import { ModalAddUser, ModalRemoveUser } from "src/pages/page-chat/components";
import HeaderInfo from "src/pages/page-chat/components/header-info";
import HeaderMenu from "src/pages/page-chat/components/header-menu";
import Kebab from "src/pages/page-chat/components/kebab";
import { Modal } from "src/partials";

import css from "./style.module.css";

export default class Header extends Block {
  onShow() {
    this.children.Menu.setProps({ show: !this.children.Menu.props.show });
  }

  onAdd() {
    this.children.ModalAdd.setProps({ show: true });
  }

  onCloseAdd() {
    this.children.ModalAdd.setProps({ show: false });
  }

  onRemove() {
    this.children.ModalRemove.setProps({ show: true });
  }

  onCloseRemove() {
    this.children.ModalRemove.setProps({ show: false });
  }

  init(): void {
    const onShowBind = this.onShow.bind(this);
    const onAddBind = this.onAdd.bind(this);
    const onRemoveBind = this.onRemove.bind(this);
    const onCloseRemoveBind = this.onCloseRemove.bind(this);
    const onCloseAddBind = this.onCloseAdd.bind(this);

    const Header = new HeaderInfo();

    const HeaderKebab = new Kebab({ onShow: onShowBind });

    const Menu = new HeaderMenu({
      onAdd: onAddBind,
      onRemove: onRemoveBind,
    });

    const ModalRemove = new Modal({
      show: false,
      title: "Удалить из чата",
      body: new ModalRemoveUser({ close: onCloseRemoveBind }),
    });

    const ModalAdd = new Modal({
      show: false,
      title: "Добавить в чат",
      body: new ModalAddUser({ close: onCloseAddBind }),
    });

    this.children = {
      ...this.children,
      Header,
      HeaderKebab,
      Menu,
      ModalRemove,
      ModalAdd,
    };
  }

  render(): string {
    return `
      <div class="${css.header}">
        {{{ Header }}}
        {{{ HeaderKebab }}}
        {{{ Menu }}}
        {{{ ModalRemove }}}
        {{{ ModalAdd }}}
      </div>
    `;
  }
}
