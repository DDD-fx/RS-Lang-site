import StatModel from './statModel';
import { LocalStorage } from '../../utils/storage';
import { renderStatTemplate, anonimStatTemplate } from '../../components/layout/statTemplate';
import { getChartConfig, setWordsData } from './chartConfigs';
import { StatOptionalDayType } from '../../types/userTypes';
import { getElement } from '../../utils/tools';
import history from '../../utils/history';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class StatisticsView {
  render = (dayData?: StatOptionalDayType): void => {
    const mainWrapper = getElement('main__wrapper');
    mainWrapper.innerHTML = '';

    if (LocalStorage.isAuth) {
      mainWrapper.insertAdjacentHTML(
        'afterbegin',
        renderStatTemplate(dayData as StatOptionalDayType),
      );
    } else {
      mainWrapper.insertAdjacentHTML('afterbegin', anonimStatTemplate);
      this.bind();
    }
  };

  bind = (): void => {
    getElement('statistics').addEventListener('click', (event) => {
      if ((<HTMLElement>event.target).classList.contains('btn-stat-login')) {
        event.preventDefault();
        history.push('/login');
      }
    });
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
    if (LocalStorage.isAuth) {
      await this.model.mount();
      const { dayData, allDaysData } = this.model.state;
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
    } else {
      this.view.render();
    }
  };
}

export default Statistics;
