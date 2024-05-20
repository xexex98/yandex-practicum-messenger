import { TUpdateProfilePassword } from "src/api/profile";
import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import { isEqualPassword, validate, validateForm } from "src/helpers";
import isEqual from "src/helpers/is-equal";
import { ProfileEditInfoField } from "src/pages/page-profile/components";
import controller from "src/pages/page-profile/controller";
import { PasswordError } from "src/pages/page-registration/components";
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
      events: {
        click: async (e: Event) => {
          e.preventDefault();

          const isValid = validateForm(this.children);

          if (isValid) {
            if (
              !isEqualPassword(
                this.children.NewPassword.props.value as string,
                this.children.RepeatNewPassword.props.value as string
              )
            ) {
              store.set("pwdError", true);
              return;
            } else {
              await controller.updateProfilePassword({
                oldPassword: this.children.OldPassword.props.value,
                newPassword: this.children.NewPassword.props.value,
                repeatPassword: this.children.RepeatNewPassword.props.value,
              } as TUpdateProfilePassword);
              store.set("pwdError", false);
            }

            if (
              typeof this.props.onSaveEdit === "function" &&
              store.getState().isPasswordEditError === false
            ) {
              this.props.onSaveEdit();
            }
          }
        },
      },
    });

    const Error = new ApiError();
    const PwdError = new PasswordError();

    this.children = {
      ...this.children,
      OldPassword,
      NewPassword,
      RepeatNewPassword,
      Save,
      Error,
      PwdError,
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
    super({ ...props, isPasswordEditError: false, events: { submit: (e) => e.preventDefault() } });
  }

  render() {
    return `
      <form>
        {{{ OldPassword }}}
        {{{ NewPassword }}}
        {{{ RepeatNewPassword }}}
        {{{ PwdError }}}
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
