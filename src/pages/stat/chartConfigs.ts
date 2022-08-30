import { ChartConfiguration, ChartData } from 'chart.js';

const newWordsData = {
  datasets: [
    {
      label: 'Количество новых слов',
      data: [20, 10, 40, 50, 80, 110, 70, 50],
      borderColor: '#a8eee4',
      backgroundColor: '#a8eee4',
    },
  ],
  labels: [
    '2016-12-20',
    '2016-12-21',
    '2016-12-22',
    '2016-12-23',
    '2016-12-24',
    '2016-12-25',
    '2016-12-26',
    '2016-12-27',
  ],
};

const learnedWordsData = {
  datasets: [
    {
      label: 'Количество изученных слов',
      data: [2, 5, 3, 6, 9, 5, 4, 11],
      borderColor: '#a8eee4',
      backgroundColor: '#a8eee4',
    },
  ],
  labels: [
    '2016-12-20',
    '2016-12-21',
    '2016-12-22',
    '2016-12-23',
    '2016-12-24',
    '2016-12-25',
    '2016-12-26',
    '2016-12-27',
  ],
};

const getChartConfig = (data: ChartData<'line'>): ChartConfiguration<'line'> => {
  return {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: 'white',
          },
        },
        title: {
          display: true,
          // text: 'Количество новых слов',
          color: 'white',
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'white',
            //  borderColor: 'white'
          },
        },
        y: {
          ticks: {
            color: 'white',
            //  borderColor: 'white'
          },
        },
      },
    },
  };
};

export { getChartConfig, newWordsData, learnedWordsData };
//const labels = Utils.months({count: 7});
