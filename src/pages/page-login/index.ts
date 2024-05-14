import Block from "src/core/block";
import connect from "src/core/connect";
import { FormLogin } from "src/pages/page-login/components";
import controller from "src/pages/page-login/controller";
import FormWrapper from "src/partials/form-wrapper";
import Loader from "src/partials/loader";

import css from "./style.module.css";

class PageLogin extends Block {
  public init(): void {
    controller.me();
  }

  constructor() {
    super({
      FormLogin: new FormWrapper({
        title: "Вход",
        body: new FormLogin(),
      }),
      Loader: new Loader(),
    });
  }

  render() {
    return `
      <main class="${css.container}">
        {{{ Loader }}}
        {{{ FormLogin }}}
      </main>
    `;
  }
}
const login = connect((state) => state);

export default login(PageLogin);
