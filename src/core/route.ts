import Block from "src/core/block";
import trim from "src/helpers/trim";

type TProps = Record<string, unknown>;

export default class Route<T extends Block = Block> {
  private _pathname: string;
  private _blockClass: new () => T;
  private _block: T | null;
  private _props: TProps;

  constructor(pathname: string, view: new () => T, props: TProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return trim(pathname) === trim(this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass();

      this._render(this._props.rootQuery as string, this._block);
      return;
    }

    this._block.show();
  }

  private _render(query: string, block: Block): void {
    const root = document.querySelector(query);

    if (!root) {
      throw Error(`render: Не удалось найти контейнер ${query}`);
    }

    root.innerHTML = "";

    root.appendChild(block.getContent() as Node);
  }
}
