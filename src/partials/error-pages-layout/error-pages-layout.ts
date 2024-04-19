import Block from "../../reactivity/block";

export default class ErrorPagesLayout extends Block {
  render() {
    return `
    <main class="error-page">
      <h3>{{{ error }}}</h3>
      <p>{{{ reason }}}</p>
      <a href="#">Назад к чатам</a>
      </main>
      `;
  }
}
