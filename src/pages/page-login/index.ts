import FormLogin from "src/partials/form-login";
import FormWrapper from "src/partials/form-wrapper";
import Block from "src/reactivity/block";

import css from "./style.module.css";

export default class PageLogin extends Block {
  constructor() {
    super({
      FormLogin: new FormWrapper({
        title: "Вход",
        body: new FormLogin(),
      }),
    });
  }

  render() {
    return `
      <main class="${css.login}">
        {{{FormLogin}}}
      </main>
    `;
  }
}
