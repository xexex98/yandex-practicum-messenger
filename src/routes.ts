import * as Pages from "./pages";

export type TPages = keyof typeof pages;

const pages = {
  nav: [Pages.Navigation, {}],
  login: [Pages.PageLogin],
  registration: [Pages.Registration],
  "404": [Pages.PageNotFound],
  "500": [Pages.PageServerError],
  profile: [Pages.Profile],
  messenger: [Pages.Messenger],
};

export default pages;
