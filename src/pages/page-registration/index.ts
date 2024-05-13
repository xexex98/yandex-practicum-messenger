import Block from "src/core/block";
import FormRegistration from "src/pages/page-registration/components/form-registration";
import { Loader } from "src/partials";
import FormWrapper from "src/partials/form-wrapper";

import css from "./style.module.css";

export default class PageRegistration extends Block {
  constructor() {
    super({
      FormRegistration: new FormWrapper({
        title: "Регистрация",
        body: new FormRegistration(),
      }),
      Loader: new Loader(),
    });
  }

  render() {
    return `
      <main class="${css.container}">
        {{{ Loader }}}
        {{{ FormRegistration }}}
      </main>
    `;
  }
}
