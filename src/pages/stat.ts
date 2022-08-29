//import View from './view';
import { getStat } from '../model/api/statApi';

class Statistics {
  view;

  // model: Model;

  constructor() {
    //  this.model = new Model();
    this.view = new StatisticsView();
  }

  init = (): void => {
    // this.model.mount().catch((err) => console.error(err));
    this.view.render();
  };
}

import renderstatTemplate from '../components/layout/statTemplate';
import { createElement, getElement } from '../utils/tools';
import history from '../utils/history';

class StatisticsView {
  render = (): void => {
    const mainWrapper = getElement('main__wrapper');
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', renderstatTemplate());
  };

  bind = () => {};
}

export default Statistics;
