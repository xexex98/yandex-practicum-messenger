import Block from "src/core/block";
import { RLink, RLinkWithEvent } from "src/partials";

export default class ProfileControls extends Block {
  onEditInfo() {
    if (typeof this.props.onEditInfo === "function") {
      this.props.onEditInfo();
    }
    this.hide();
  }

  onEditPassword() {
    if (typeof this.props.onEditPassword === "function") {
      this.props.onEditPassword();
    }
    this.hide();
  }

  init() {
    const onEditInfoBind = this.onEditInfo.bind(this);
    const onEditPasswordBind = this.onEditPassword.bind(this);

    const LinkEditInfo = new RLinkWithEvent({
      label: "Изменить данные",
      href: "#",
      class: "profile-underline",
      onClick: onEditInfoBind,
    });
    const LinkChangePassword = new RLinkWithEvent({
      label: "Изменить пароль",
      href: "#",
      class: "profile-underline",
      onClick: onEditPasswordBind,
    });
    const LinkLogout = new RLink({
      label: "Выйти",
      href: "#",
      class: "logout",
    });

    this.children = {
      ...this.children,
      LinkEditInfo,
      LinkChangePassword,
      LinkLogout,
    };
  }

  render(): string {
    return `
      <div>
        {{{ LinkEditInfo }}}
        {{{ LinkChangePassword }}}
        {{{ LinkLogout }}}
      </div>
    `;
  }
}
