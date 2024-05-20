import Block from "src/core/block";
import connect from "src/core/connect";
import { RESOURCES } from "src/core/const";

import css from "./style.module.css";

type TProps = {
  name: string;
};
class HeaderInfo extends Block {
  constructor(props: TProps) {
    super(props);
  }

  render() {
    return `
      <div class="${css.container}">
        {{#each chatUsers}}
          <div class="${css.avatar}">
            <div class="${css.login}">
              {{#if avatar}}
                <img class="${css.img}" src="${RESOURCES}{{avatar}}" />
              {{/if}}
            </div>
            <p>{{ first_name }}[{{ id }}]</p>
          </div>
        {{/each}}
      </div>
    `;
  }
}

export default connect(({ chatUsers, chatId }) => ({ chatUsers, chatId }))(HeaderInfo);
