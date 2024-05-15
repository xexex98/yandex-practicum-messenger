import Handlebars from "handlebars";

import * as Partials from "../partials";

export const registerPartial = () => {
  Object.entries(Partials).forEach(([name, component]) => {
    if (typeof component === "string") {
      Handlebars.registerPartial(name, component);
    }
  });

  Handlebars.registerHelper("equal", function (a, b) {
    console.log(a, b);
    return a === b;
  });
};
