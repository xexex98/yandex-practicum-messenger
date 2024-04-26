import FormRegistration from "src/pages/page-registration/components/form-registration";
import FormWrapper from "src/partials/form-wrapper";
import Block from "src/reactivity/block";

import css from "./style.module.css";

export default class PageRegistration extends Block {
  constructor() {
    super({
      FormRegistration: new FormWrapper({
        title: "Регистрация",
        body: new FormRegistration({}),
      }),
    });
  }

  render() {
    return `
      <main class="${css.container}">
        {{{ FormRegistration }}}
      </main>
    `;
  }
}
