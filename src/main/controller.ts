import View from "./view/view";
import Model from "./model";

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
