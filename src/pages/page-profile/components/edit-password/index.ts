import { validate } from "src/helpers";
import { ProfileEditInfoField } from "src/pages/page-profile/components";
import { RButton } from "src/partials";
import Block from "src/reactivity/block";

export default class ProfileEditPassword extends Block {
  init() {
    const OldPassword = new ProfileEditInfoField({
      label: "Старый пароль",
      name: "oldPassword",
      type: "password",
      onBlur: (e) => validate(e.target.value, this.children.OldPassword),
    });

    const NewPassword = new ProfileEditInfoField({
      label: "Новый пароль",
      name: "newPassword",
      type: "password",
      onBlur: (e) => validate(e.target.value, this.children.NewPassword),
    });

    const RepeatNewPassword = new ProfileEditInfoField({
      label: "Новый пароль",
      name: "repeatNewPassword",
      type: "password",
      onBlur: (e) => validate(e.target.value, this.children.RepeatNewPassword),
    });

    const Save = new RButton({
      text: "Сохранить",
      type: "submit",
      onClick: (e) => {
        e.preventDefault();
        this.props.onSaveEdit();
        this.hide();

        console.log({
          oldPassword: this.children.OldPassword.props.oldPassword,
          newPassword: this.children.NewPassword.props.newPassword,
          repeatPassword: this.children.RepeatNewPassword.props.repeatNewPassword,
        });
      },
    });

    this.children = {
      ...this.children,
      OldPassword,
      NewPassword,
      RepeatNewPassword,
      Save,
    };
  }

  render() {
    return `
      <form>
        {{{ OldPassword }}}
        {{{ NewPassword }}}
        {{{ RepeatNewPassword }}}
        {{{ Save }}}
      </form>
    `;
  }
}
