import Block from "src/core/block";
import ErrorPagesLayout from "src/partials/error-pages-layout";

export default class PageNotFound extends Block {
  constructor() {
    super({
      ErrorPagesLayout: new ErrorPagesLayout({
        error: "404",
        description: "Не туда попали",
      }),
    });
  }
  render() {
    return `
      <main>
        {{{ErrorPagesLayout}}}
      </main>
    `;
  }
}
