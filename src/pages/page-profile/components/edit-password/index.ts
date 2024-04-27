import Block from "src/core/block";
import { validate, validateForm } from "src/helpers";
import { ProfileEditInfoField } from "src/pages/page-profile/components";
import { RButton } from "src/partials";

export default class ProfileEditPassword extends Block {
  init() {
    const OldPassword = new ProfileEditInfoField({
      label: "Старый пароль",
      name: "oldPassword",
      type: "password",
      onBlur: (e) => validate((e.target as HTMLInputElement).value, this.children.OldPassword),
    });

    const NewPassword = new ProfileEditInfoField({
      label: "Новый пароль",
      name: "newPassword",
      type: "password",
      onBlur: (e) => validate((e.target as HTMLInputElement).value, this.children.NewPassword),
    });

    const RepeatNewPassword = new ProfileEditInfoField({
      label: "Повторите новый пароль",
      name: "repeatNewPassword",
      type: "password",
      onBlur: (e) =>
        validate((e.target as HTMLInputElement).value, this.children.RepeatNewPassword),
    });

    const Save = new RButton({
      text: "Сохранить",
      type: "submit",
      onClick: (e: Event) => {
        e.preventDefault();

        const isValid = validateForm(this.children);

        if (isValid) {
          if (typeof this.props.onSaveEdit === "function") {
            this.props.onSaveEdit();
          }
          this.hide();

          console.log({
            oldPassword: this.children.OldPassword.props.value,
            newPassword: this.children.NewPassword.props.value,
            repeatPassword: this.children.RepeatNewPassword.props.value,
          });
        }
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
