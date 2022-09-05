import View from './view';
import { Model } from '../../model/model';
import { AppInterface, ModelInterface, ViewInterface } from '../../types/types';

class App implements AppInterface {
  view: ViewInterface;

  model: ModelInterface;

  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  init = (): void => {
    this.model.mount().catch((err) => console.error(err));
    this.view.render();
  };
}

export default App;
