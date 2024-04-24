import * as Pages from "./pages";

export type TPages = keyof typeof pages;

const pages = {
  nav: [Pages.PageNavigation],
  login: [Pages.PageLogin],
  registration: [Pages.PageRegistration],
  "404": [Pages.PageNotFound],
  "500": [Pages.PageServerError],
  profile: [Pages.PageProfile],
  chat: [Pages.PageChat],
};

export default pages;
