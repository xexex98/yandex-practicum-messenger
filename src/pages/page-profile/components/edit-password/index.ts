import { TUpdateProfilePassword } from "src/api/profile";
import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import { validate, validateForm } from "src/helpers";
import isEqual from "src/helpers/is-equal";
import { ProfileEditInfoField } from "src/pages/page-profile/components";
import controller from "src/pages/page-profile/controller";
import { ApiError, RButton } from "src/partials";

class ProfileEditPassword extends Block {
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
      disabled: false,
      text: "Сохранить",
      type: "submit",
      onClick: async (e: Event) => {
        e.preventDefault();

        const isValid = validateForm(this.children);

        if (isValid) {
          await controller.updateProfilePassword({
            oldPassword: this.children.OldPassword.props.value,
            newPassword: this.children.NewPassword.props.value,
            repeatPassword: this.children.RepeatNewPassword.props.value,
          } as TUpdateProfilePassword);

          if (
            typeof this.props.onSaveEdit === "function" &&
            store.getState().isProfileEditError === false
          ) {
            this.props.onSaveEdit();
          }

          console.log({
            oldPassword: this.children.OldPassword.props.value,
            newPassword: this.children.NewPassword.props.value,
            repeatPassword: this.children.RepeatNewPassword.props.value,
          });
        }
      },
    });

    const Error = new ApiError();

    this.children = {
      ...this.children,
      OldPassword,
      NewPassword,
      RepeatNewPassword,
      Save,
      Error,
    };
  }

  public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    this.children.Save.setProps({ disabled: store.getState().loading });
    this.setProps({ isPasswordEditError: store.getState().isPasswordEditError });
    return true;
  }

  constructor(props: BlockProps) {
    super({ ...props, isPasswordEditError: false });
  }

  render() {
    return `
      <form>
        {{{ OldPassword }}}
        {{{ NewPassword }}}
        {{{ RepeatNewPassword }}}
        {{{ Save }}}
        {{#if isPasswordEditError}}
          {{{ Error }}}
        {{/if}}
      </form>
    `;
  }
}

export default connect(({ isPasswordEditError, loading }) => ({
  isPasswordEditError,
  loading,
}))(ProfileEditPassword);
