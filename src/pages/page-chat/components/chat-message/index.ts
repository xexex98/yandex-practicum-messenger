import Block from "src/core/block";

import css from "./style.module.css";

export default class ChatMessage extends Block {
  render(): string {
    return `
      <div class="${css.msg} {{ type }}">
        <p>
          {{{ content }}}
          <span class="${css.time}">
            <span class="${css.read}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
              >
                <line
                  y1="-0.5"
                  x2="3.765"
                  y2="-0.5"
                  transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33313)"
                  stroke="rgb(var(--primary-color))"

                />
                <line
                  y1="-0.5"
                  x2="5.6475"
                  y2="-0.5"
                  transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.35828 5)"
                  stroke="rgb(var(--primary-color))"
                />
                <line
                  y1="-0.5"
                  x2="5.6475"
                  y2="-0.5"
                  transform="matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5)"
                  stroke="rgb(var(--primary-color))"
                /></svg>
              </span>
              11:12
          </span>
        </p>
      </div>
    `;
  }
}
