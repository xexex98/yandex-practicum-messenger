import * as Pages from "./pages";

export type TPages = keyof typeof pages;

const pages = {
  nav: [Pages.Navigation],
  login: [Pages.Login],
  registration: [Pages.Registration],
  404: [Pages.NotFound],
  500: [Pages.ServerError],
  profile: [Pages.Profile],
  messenger: [Pages.Messenger],
};

export default pages;
