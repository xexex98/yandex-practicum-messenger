import Block from "src/core/block";
import router from "src/core/router";
import controller from "src/pages/page-profile/controller";
import { ButtonLink } from "src/partials";

export default class ProfileControls extends Block {
  onEditInfo() {
    if (typeof this.props.onEditInfo === "function") {
      this.props.onEditInfo();
    }
  }

  onEditPassword() {
    if (typeof this.props.onEditPassword === "function") {
      this.props.onEditPassword();
    }
  }

  init() {
    const onEditInfoBind = this.onEditInfo.bind(this);
    const onEditPasswordBind = this.onEditPassword.bind(this);

    const LinkEditInfo = new ButtonLink({
      text: "Изменить данные",
      type: "button",
      class: "profile-underline",
      events: {
        click: onEditInfoBind,
      },
    });
    const LinkChangePassword = new ButtonLink({
      text: "Изменить пароль",
      class: "profile-underline",
      type: "button",
      events: {
        click: onEditPasswordBind,
      },
    });
    const LinkLogout = new ButtonLink({
      text: "Выйти",
      class: "logout",
      type: "button",
      events: {
        click: () => {
          void controller.logout();
          router.go("/");
        },
      },
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
