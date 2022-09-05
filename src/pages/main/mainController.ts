import MainView from './mainView';
import { MainModel } from './mainModel';
import { MainControllerInterface, ModelInterface, ViewInterface } from '../../types/types';

class MainController implements MainControllerInterface {
  view: ViewInterface;

  model: ModelInterface;

  constructor() {
    this.model = new MainModel();
    this.view = new MainView();
  }

  init = (): void => {
    this.model.mount().catch((err) => console.error(err));
    this.view.render();
  };
}

export default MainController;
