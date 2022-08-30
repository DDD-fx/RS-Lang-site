//import View from './view';
import { getStat } from '../../model/api/statApi';
import renderstatTemplate from '../../components/layout/statTemplate';
import { getChartConfig, newWordsData, learnedWordsData } from './chartConfigs';
import { getElement } from '../../utils/tools';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

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
    const newWordChart = new Chart(
      <HTMLCanvasElement>getElement('newWordsChart'),
      getChartConfig(newWordsData),
    );
    const learnedWordChart = new Chart(
      <HTMLCanvasElement>getElement('learnedWordsChart'),
      getChartConfig(learnedWordsData),
    );
  };
}

class StatisticsView {
  render = (): void => {
    const mainWrapper = getElement('main__wrapper');
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', renderstatTemplate());
  };

  bind = () => {};
}

export default Statistics;
