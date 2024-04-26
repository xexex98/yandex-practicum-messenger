import Block from "src/core/block";
import HeaderInfo from "src/pages/page-chat/components/header-info";
import HeaderMenu from "src/pages/page-chat/components/header-menu";
import Kebab from "src/pages/page-chat/components/kebab";
import UserModal from "src/pages/page-chat/components/user-modal";

import css from "./style.module.css";

export default class Header extends Block {
  onShow() {
    const Menu = this.children.Menu;

    Menu.setProps({ show: !Menu.props.show });
  }

  onAdd() {
    const Modal = this.children.Modal;

    Modal.setProps({ show: true, title: "Добавить пользователя" });
  }

  onRemove() {
    const Modal = this.children.Modal;

    Modal.setProps({ show: true, title: "Удалить пользователя" });
  }

  init(): void {
    const onShowBind = this.onShow.bind(this);
    const onAddBind = this.onAdd.bind(this);
    const onRemoveBind = this.onRemove.bind(this);

    const Header = new HeaderInfo({
      name: "Андрей",
    });

    const HeaderKebab = new Kebab({ onShow: onShowBind });

    const Menu = new HeaderMenu({ onAdd: onAddBind, onRemove: onRemoveBind });

    const Modal = new UserModal();

    this.children = {
      ...this.children,
      Header,
      HeaderKebab,
      Menu,
      Modal,
    };
  }

  render(): string {
    return `
      <div class="${css.header}">
        {{{ Header }}}
        {{{ HeaderKebab }}}
        {{{ Menu }}}
        {{{ Modal }}}
      </div>
    `;
  }
}
