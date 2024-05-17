import Block from "src/core/block";
import connect from "src/core/connect";

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
      <div class="${css.avatar}">
        <div class="${css.login}"></div>
        {{#each chatUsers}}
          <span>{{ first_name }}[{{ id }}]</span>
        {{/each}}
      </div>
    `;
  }
}

export default connect(({ chatUsers, chatId }) => ({ chatUsers, chatId }))(HeaderInfo);
