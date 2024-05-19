import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import isEqual from "src/helpers/is-equal";
import FormRegistration from "src/pages/page-registration/components/form-registration";
import { Loader } from "src/partials";
import FormWrapper from "src/partials/form-wrapper";

import css from "./style.module.css";

class PageRegistration extends Block {
  constructor() {
    super({
      FormRegistration: new FormWrapper({
        title: "Регистрация",
        body: new FormRegistration(),
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
        {{{ FormRegistration }}}
      </main>
    `;
  }
}

export default connect(({ loading }) => ({ loading }))(PageRegistration);
