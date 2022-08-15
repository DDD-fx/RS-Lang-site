import View from './view';
import Model from '../../model/model';

class App {
  view: View;

  model: Model;

  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  init = () => {
    this.view.render();
    this.mountListeners();
  };

  mountListeners = () => {};
}

export default App;
