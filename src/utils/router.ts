import UniversalRouter from 'universal-router';
import { Routes, HistoryLocation } from '../types/types';
import history from '../index';

class Router {
  routes;

  router;

  constructor(routes: Routes[]) {
    this.routes = routes;
    this.router = new UniversalRouter(routes);
    this.setRouter();
  }

  render = async (location: HistoryLocation) => {
    await this.router.resolve(location.pathname).catch(() => {});
  };

  setRouter = () => {
    history.listen(({ location }) => {
      this.render(location).catch((err) => console.error(err));
    });
  };
}

export default Router;
