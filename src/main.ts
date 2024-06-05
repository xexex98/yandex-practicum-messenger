import router from "src/core/router";
import { PageLogin, PageNotFound, PageProfile, PageRegistration, PageServerError } from "src/pages";
import PageMessenger from "src/pages/page-chat";

import { registerPartial } from "./init/register-partials";

import "./style.css";

registerPartial();

document.addEventListener("DOMContentLoaded", () => {
  let b;

  router
    .use("/", PageLogin)
    .use("/sign-up", PageRegistration)
    .use("/settings", PageProfile)
    .use("/messenger", PageMessenger)
    .use("/404", PageNotFound)
    .use("/500", PageServerError)
    .start();
});
