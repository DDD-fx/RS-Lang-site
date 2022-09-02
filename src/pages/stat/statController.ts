//import View from './view';
import StatModel from './statModel';
import renderstatTemplate from '../../components/layout/statTemplate';
import { getChartConfig, setWordsData } from './chartConfigs';
import { StatOptionalDayType } from '../../types/userTypes';
import { getElement } from '../../utils/tools';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class StatisticsView {
  render = (dayData: StatOptionalDayType): void => {
    const mainWrapper = getElement('main__wrapper');
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', renderstatTemplate(dayData));
  };
}

class Statistics {
  view;

  model;

  constructor() {
    this.model = new StatModel();
    this.view = new StatisticsView();
  }

  init = async (): Promise<void> => {
    await this.model.mount();
    const { dayData, allDaysData } = this.model.state;
    // this.model.mount().catch((err) => console.error(err));
    this.view.render(dayData);
    (() =>
      new Chart(
        <HTMLCanvasElement>getElement('newWordsChart'),
        getChartConfig(
          setWordsData('Количество новых слов', allDaysData.newWords, allDaysData.labels),
        ),
      ))();
    (() =>
      new Chart(
        <HTMLCanvasElement>getElement('learnedWordsChart'),
        getChartConfig(
          setWordsData('Количество изученных слов', allDaysData.learnedWords, allDaysData.labels),
        ),
      ))();
  };
}

export default Statistics;
