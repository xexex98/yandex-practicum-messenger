import Block from "src/core/block";
import connect from "src/core/connect";
import { DialogsList, SearchResult } from "src/pages/page-chat/components";
import { ApiError } from "src/partials";

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
      <div>
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

export default connect(({ isSearch, dialogsError, chats }) => ({
  isSearch,
  dialogsError,
  chats,
}))(Dialogs);
