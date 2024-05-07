import Handlebars from "handlebars";
import APIRegister from "src/api/registration";
import Router from "src/core/router";
import { PageLogin } from "src/pages";

import { registerPartial } from "./init/register-partials";
import pages, { TPages } from "./routes";

import "./style.css";

registerPartial();

// document.addEventListener("DOMContentLoaded", () => {
const router = new Router("#app");

router.use("/", PageLogin).start();

router.go("/");
// });

// function navigate(page: TPages) {
//   const [source, context] = pages[page];
//   const container = document.getElementById("app");

//   if (source instanceof Object) {
//     //TODO! пока никак не получилось типизировать
//     //! const [source, context] = pages[page];
//     //! не смог разрешить ошибку -> Argument of type 'typeof PageNavigation is not assignable to parameter of type 'BlockProps | undefined'.
//     //! поправлю в следующем спринте, не успеваю :(
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     const page = new source(context);

//     if (!container) {
//       throw new Error("Не удалось найти контейнер app");
//     }

//     container.innerHTML = "";
//     container.append(page.getContent() as Node);
//     return;
//   }

//   if (container) {
//     container.innerHTML = Handlebars.compile(source)(context);
//   }
// }
// document.addEventListener("DOMContentLoaded", () => navigate("login"));

// document.addEventListener("click", (e) => {
//   const target = e.target as HTMLLinkElement;
//   const page = target.getAttribute("page") as TPages;

//   if (page) {
//     navigate(page);
//     e.preventDefault();
//     e.stopImmediatePropagation();
//   }
// });
