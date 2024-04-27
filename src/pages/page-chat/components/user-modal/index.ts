import Block from "src/core/block";
import { validate, validateForm } from "src/helpers";
import { RButton, RInput } from "src/partials";

import css from "./style.module.css";

export default class UserModal extends Block {
  init(): void {
    const onChangeLoginBind = this.onChangeLogin.bind(this);
    const onSubmitBind = this.onSubmit.bind(this);
    const onCloseBind = this.onClose.bind(this);

    const Input = new RInput({
      label: "Логин",
      name: "login",
      type: "text",
      onBlur: onChangeLoginBind,
    });

    const Button = new RButton({ text: "Применить", onClick: onSubmitBind });
    const Close = new RButton({ text: "Отменить", onClick: onCloseBind });

    this.children = {
      ...this.children,
      Input,
      Button,
      Close,
    };
  }

  onChangeLogin(e?: Event) {
    validate((e?.target as HTMLInputElement).value, this.children.Input);
  }

  onSubmit(e: Event) {
    e.preventDefault();

    const isValid = validateForm(this.children);

    if (isValid) {
      console.log({ login: this.children.Input.props.value });
      this.setProps({
        show: false,
      });
    }
    this.children.Input.setProps({ value: "" });
  }

  onClose(e: Event) {
    e.preventDefault();

    this.setProps({
      show: false,
    });

    this.children.Input.setProps({
      error: false,
      errorText: null,
      value: "",
    });
  }

  render() {
    return `
      <div class="${css.modal} {{#if show}}${css.show}{{/if}} ">
        <div class="${css.content}">
          <p class="${css.title}">{{ title }}</p>
          <form action="#">
            {{{ Input }}}
            <div class="${css.buttons}">
              {{{ Button }}}
              {{{ Close }}}
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
