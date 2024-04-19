import { FormLogin } from "src/partials/form-login";
import { FormWrapper } from "src/partials/form-wrapper";
import Block from "src/reactivity/block";

import "./page-login.css";

export default class PageLogin extends Block {
  constructor(props) {
    super({
      ...props,
      FormLogin: new FormWrapper({
        title: "Вход",
        body: new FormLogin(),
      }),
    });
  }

  render() {
    return `
      <main class="login">
        {{{FormLogin}}}
      </main>
    `;
  }
}
