import Block from "../../reactivity/block";

import styles from "./style.module.css";

export default class ErrorPagesLayout extends Block {
  render() {
    return `
    <div>
      <h3>{{{ error }}}</h3>
      <p>{{{ reason }}}</p>
      <a href="#">Назад к чатам</a>
    </div>
      `;
  }
}
