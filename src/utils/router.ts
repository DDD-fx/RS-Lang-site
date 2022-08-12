import UniversalRouter from "universal-router";
import { Routes } from "../types/types";
import { history } from "../components/nav";

type Location = {
hash: string
key: string
pathname: string
search: string
state: null | unknown
}

class Router {
  routes;
  router;
  constructor(routes: Routes[]) {
    this.routes = routes;
    this.router = new UniversalRouter(routes);
    this.setRouter();
    this.render(history.location);
  }

  render = async (location: Location) => {
    await this.router.resolve(location.pathname).catch(() => {});
  };

  setRouter = () => {
 
    history.listen( ({ action, location }) => {
    this.render(location);
    });

  };
}

export default Router;
