import { RInput } from "src/partials";

//TODO! Поправить сообщения об ошибке, поправлю потом. пока не успеваю :(
export function validate(value: string, el) {
  const regexp = {
    email: /^[a-zA-Z0-9_.+-]+@[A-Za-z0-9]+([_.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/,
    login: /^[A-Za-z][A-Za-z0-9_-]{2,19}$/,
    first_name: /^[A-ZЁА-Я][a-zA-ZЁA-Яёа-я-]+$/,
    second_name: /^[A-ZЁА-Я][a-zA-ZЁA-Яёа-я-]+$/,
    display_name: /^[A-ZЁА-Я][a-zA-ZЁA-Яёа-я-]+$/,
    phone: /^(\+)?\d{10,15}$/,
    password: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
    oldPassword: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
    newPassword: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
    repeatNewPassword: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
    password_check: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
  };

  const name = el.props.name;

  if (!regexp[name].test(value) || !value) {
    console.log("error");
    el.setProps({
      errorText: `Некорректно заполнено: ${el.props.label}`,
      error: true,
    });
    return false;
  }
  console.log("ok");
  el.setProps({ error: false, errorText: null, value });
  return true;
}

export function validateForm(elements) {
  const fields = Object.keys(elements).filter((el) => elements[el] instanceof RInput);

  let isError = false;

  fields.forEach((el) => {
    const block = elements[el];

    isError = validate(block.props.value, elements[el]);
  });
  return isError;
}
