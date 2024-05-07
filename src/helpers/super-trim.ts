function superTrim(str: string, chars = " ") {
  const regex = new RegExp(`^[${chars}]+|[${chars}]+$`, "g");

  return str.replace(regex, "");
}

export default superTrim;
