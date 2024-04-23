import { RButton } from "src/partials";
import ProfileEditInfoField from "src/pages/page-profile/components/edit-info-field";
import Block from "src/reactivity/block";

export default class ProfileEditPassword extends Block {
  init() {
    const OldPassword = new ProfileEditInfoField({
      label: "Старый пароль",
      name: "oldPassword",
    });

    const NewPassword = new ProfileEditInfoField({
      label: "Новый пароль",
      name: "newPassword",
    });

    const RepeatNewPassword = new ProfileEditInfoField({
      label: "Новый пароль",
      name: "newPassword",
    });

    const Save = new RButton({
      text: "Сохранить",
      type: "submit",
      onClick: (e) => {
        e.preventDefault();
        this.props.onSaveEdit();
        this.hide();
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
