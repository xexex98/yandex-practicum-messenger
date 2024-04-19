import Block from "src/reactivity/block";

export default class FormWrapper extends Block {
  constructor(props) {
    super(props);
  }
  render() {
    return `
    <form
    action="#"
    class="login-form"
    >
    <h3>{{title}}</h3>
    {{{ body }}}
    </form>
    `;
  }
}
