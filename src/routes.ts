import * as Pages from "./pages";

export type TPages = keyof typeof pages;

const pages = {
  login: [Pages.PageLogin],
  registration: [Pages.PageRegistration],
  profile: [Pages.PageProfile],
  "404": [Pages.PageNotFound],
  "500": [Pages.PageServerError],
  chat: [Pages.PageChat],
};

export default pages;
