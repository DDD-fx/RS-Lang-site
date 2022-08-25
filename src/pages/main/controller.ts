import View from './view';
import Model from '../../model/model';

class App {
  view: View;

  model: Model;

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
