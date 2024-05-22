import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import isEqual from "src/helpers/is-equal";
import { FormLogin } from "src/pages/page-login/components";
import FormWrapper from "src/partials/form-wrapper";
import Loader from "src/partials/loader";

import css from "./style.module.css";

class PageLogin extends Block {
  constructor() {
    super({
      FormLogin: new FormWrapper({
        title: "Вход",
        body: new FormLogin(),
      }),
      Loader: new Loader(),
    });
  }

  public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    const loading = store.getState().loading;

    this.children.Loader.setProps({ loading });

    return true;
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

export default connect(({ loading }) => ({ loading }))(PageLogin);
