import { ChartConfiguration } from 'chart.js';

const myDataset = {
  datasets: [{
      label: 'Количество новых слов',
      data:  [20, 10],
      borderColor: '#a8eee4',
      backgroundColor: '#a8eee4',
     
    }],
  labels: ['2016-12-25', '2016-12-26']
};

const getChartConfig = (): ChartConfiguration<'line'> => {
  return {
    type: 'line',
    data: myDataset,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: "white", 
          }
        },
        title: {
          display: true,
          text: 'Количество новых слов',
          color: 'white'
        },
      },
      scales: {
    
        x: {

          ticks: {
            color: 'white',
          //  borderColor: 'white'
          }
        },
        y: {
    
          ticks: {
          
            color: 'white',
          //  borderColor: 'white'
          }
        }
      }
    },
   }
  }

export default getChartConfig;
//const labels = Utils.months({count: 7});
