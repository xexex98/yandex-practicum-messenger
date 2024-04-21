import ErrorPagesLayout from "src/partials/error-pages-layout";
import Block from "src/reactivity/block";

export default class PageNotFound extends Block {
  constructor() {
    super({
      ErrorPagesLayout: new ErrorPagesLayout({
        error: "404",
        reason: "Не туда попали",
      }),
    });
  }
  render() {
    return `
    <main class="error-page">
      {{{ErrorPagesLayout}}}
    </main>
    `;
  }
}
