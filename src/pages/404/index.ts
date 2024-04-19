import { ErrorPagesLayout } from "src/partials";
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
    return `<div>{{{ErrorPagesLayout}}}</div>`;
  }
}
