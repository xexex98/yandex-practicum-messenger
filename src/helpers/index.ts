export default function validate(value: string, el) {
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

  if (!regexp[name].test(value)) {
    console.log("error");
    el.setProps({
      errorText: `Некорректно заполнено: ${el.props.label}`,
      error: true,
    });
    return;
  } else {
    console.log("ok");
    el.setProps({ error: false, errorText: null, [name]: value });
  }
}
