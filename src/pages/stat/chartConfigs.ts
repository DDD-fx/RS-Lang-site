import { ChartConfiguration, ChartData } from 'chart.js';

const setWordsData = (label: string, wordsData: number[], labelsData: string[]) => {
  return {
    datasets: [
      {
        label: label,
        data: wordsData,
        borderColor: '#a8eee4',
        backgroundColor: 'rgb(168 238 228 / 50%)',
      },
    ],
    labels: labelsData,
  };
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
          display: false,
          color: 'white',
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'white',
          },
        },
        y: {
          ticks: {
            color: 'white',
            precision: 0,
          },
        },
      },
    },
  };
};

export { getChartConfig, setWordsData };
