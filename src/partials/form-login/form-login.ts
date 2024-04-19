import Block from "src/reactivity/block";

export default class FormLogin extends Block {
  render() {
    return `
    <div>
  <div>
  {{> Input label='Логин' name="login" error="Неверный логин" required=true}}
  {{> Input label='Пароль' name='password' type="password" error="Неверный пароль"}}
</div>
<div>
  {{> Button text='Авторизоваться'}}
  {{> Link 
    href="#"
    class="login-signup"
    label="Нет аккаунта?"
  }}
</div>
`;
  }
}
