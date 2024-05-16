import Block from "src/core/block";
import connect from "src/core/connect";
import { DialogsList, SearchResult } from "src/pages/page-chat/components";
import { ApiError } from "src/partials";

import css from "./style.module.css";

class Dialogs extends Block {
  constructor() {
    super({
      ApiError: new ApiError(),
      Result: new SearchResult(),
      DialogList: new DialogsList(),
    });
  }

  public render(): string {
    return `
      <div class="${css.dialogs}">
        {{#if dialogsError}}
          {{{ ApiError }}}
        {{/if}}
        {{#if isSearch}}
          {{{ Result }}}
        {{else}}
          {{{ DialogList }}}
        {{/if}}
      </div>
    `;
  }
}

export default connect(({ isSearch, dialogsError, chats, chatId }) => ({
  isSearch,
  dialogsError,
  chats,
  chatId,
}))(Dialogs);
