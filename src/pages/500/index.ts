import { ErrorPagesLayout } from "src/partials";
import Block from "src/reactivity/block";

export default class PageNotFound extends Block {
  constructor() {
    super({
      ErrorPagesLayout: new ErrorPagesLayout({
        error: "500",
        reason: "Мы уже фиксим",
      }),
    });
  }
  render() {
    return `<div>{{{ErrorPagesLayout}}}</div>`;
  }
}
