import UniversalRouter from 'universal-router';
import { Routes, HistoryLocation } from '../types/types';
import { history } from '../components/nav';

class Router {
  routes;
  router;
  constructor(routes: Routes[]) {
    this.routes = routes;
    this.router = new UniversalRouter(routes);
    this.setRouter();
    this.render(history.location);
  }

  render = async (location: HistoryLocation) => {
    await this.router.resolve(location.pathname).catch(() => {});
  };

  setRouter = () => {
    history.listen(({ action, location }) => {
      this.render(location);
    });
  };
}

export default Router;
