import "./styles.scss";
import App from "./pages/main/controller";
import Textbook from "./pages/textbook";
import Router from "./utils/router";
import { getElement } from "./utils/tools";
import { Routes } from "./types/types";


const app = new App();
app.init();

const main = getElement("main .wrapper");


const routes: Routes[] = [
  {
    path: "",
    action: () => {
      app.view.renderMain();
    },
  },
  {
    path: "/textbook",
    action: () => {
      (new Textbook().render());
    },
  },
  {
    path: "/games",
    action: () => {
      main.innerHTML = "<h1>Page Games</h1>";
    },
  },
  {
    path: "/stat",
    action: () => {
      main.innerHTML = "<h1>Page Statistics</h1>";
    },
  },
  {
    path: "/login",
    action: () => {
      main.innerHTML = "<h1>Not Found</h1>";
    },
  },
];

const router = new Router(routes)
