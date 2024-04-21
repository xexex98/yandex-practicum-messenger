import ErrorPagesLayout from "src/partials/error-pages-layout";
import Block from "src/reactivity/block";

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
      <main >
        {{{ErrorPagesLayout}}}
      </main>
    `;
  }
}
