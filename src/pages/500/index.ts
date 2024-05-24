import Block from "src/core/block";
import { ErrorPagesLayout } from "src/partials";

export default class PageServerError extends Block {
  constructor() {
    super({
      ErrorPagesLayout: new ErrorPagesLayout({
        error: "500",
        description: "Мы уже фиксим",
      }),
    });
  }
  render() {
    return `
      <main>
        {{{ ErrorPagesLayout }}}
      </main>
    `;
  }
}
