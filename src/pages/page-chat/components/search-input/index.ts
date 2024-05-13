import Block from "src/core/block";
import store from "src/core/store";

import css from "./style.module.css";

type TChats = Record<string, unknown>;

export default class SearchInput extends Block {
  constructor() {
    super({
      events: {
        input: (e) => {
          const value = (e.target as HTMLInputElement).value;
          const chats = store.getState().chats as TChats[];

          const foundChats = chats.filter((el) => {
            if (!el.title) {
              return false;
            }
            return (el.title as string).includes(value);
          });

          if (value) {
            store.set("isSearch", true);
            store.set("foundChats", foundChats);
          } else {
            store.set("isSearch", false);
          }
        },
      },
    });
  }

  public render(): string {
    return `
      <input
        class="${css.input}"
        type="text"
        placeholder="Поиск"
      />
    `;
  }
}
