import { LocalStorage } from '../../utils/storage';
import { STAT_ANONIM_DEFAULTS } from '../../utils/constants';
import { getShortDate } from '../../utils/tools';
import { dataTest } from './testStatData';
import { getStat, putStat } from '../../model/api/statApi';
//import { RequestOptionType } from '../../types/types';
import { StatAnswerType, StatStateType } from '../../types/userTypes';

class StatModel {
  state: StatStateType;

  constructor() {
    this.state = STAT_ANONIM_DEFAULTS;
  }
  mount = async (): Promise<void> => {
    if (LocalStorage.isAuth) {
      /*  await this.getStatData();
      const { userId, token } = LocalStorage.currUserSettings;
      const putData = await putStat(userId, token, dataTest)
     const statData = (await getStat(userId, token)) as StatAnswerType;
      console.log(putData);
      console.log(statData);*/
    }
    console.log(getShortDate());
  };

  getStatData = async (): Promise<void> => {
    const { userId, token } = LocalStorage.currUserSettings;
    const statData = (await getStat(userId, token)) as StatAnswerType;
    const statOptData = statData.optional;
    const todayKey = getShortDate();

    const statDataKeys = Object.keys(statOptData);

    this.state.dayData = statOptData[todayKey];
    let allDaysNewWords = [];
    let allDaysLearnedWords = [];
    let allDaysLearnedWordsTemp = 0;
    for (let key in statOptData) {
      allDaysNewWords.push(
        statOptData[key]['audiochallenge']['wordsPerDay'] +
          statOptData[key]['sprint']['wordsPerDay'],
      );
      allDaysLearnedWordsTemp +=
        statOptData[key]['audiochallenge']['learnedWordsPerDay'] +
        statOptData[key]['sprint']['learnedWordsPerDay'];
      allDaysLearnedWords.push(allDaysLearnedWordsTemp);
    }

    this.state.allDaysData = {
      labels: statDataKeys,
      learnedWords: allDaysLearnedWords,
      newWords: allDaysNewWords,
    };
  };
}

export default StatModel;
