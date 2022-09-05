import { LocalStorage } from '../../utils/storage';
import { STAT_ANONIM_DEFAULTS } from '../../utils/constants';
import { getShortDate } from '../../utils/tools';
import { getStat } from '../../model/api/statApi';
import { StatAnswerType, StatStateType } from '../../types/userTypes';
import { StatModelInterface } from '../../types/types';

class StatModel implements StatModelInterface {
  state: StatStateType;

  constructor() {
    this.state = STAT_ANONIM_DEFAULTS;
  }

  mount = async (): Promise<void> => {
    if (LocalStorage.isAuth) {
      await this.getStatData();
    }
  };

  getStatData = async (): Promise<void> => {
    const { userId, token } = LocalStorage.currUserSettings;
    const statData = (await getStat(userId, token)) as StatAnswerType | null;
    if (statData) {
      const statOptData = statData.optional;
      const todayKey = getShortDate();
      const statDataKeys = Object.keys(statOptData);
      if (todayKey in statOptData) this.state.dayData = statOptData[todayKey];
      const allDaysNewWords = [];
      const allDaysLearnedWords = [];
      let allDaysLearnedWordsTemp = 0;
      if (statDataKeys.length !== 0) {
        for (const key in statOptData) {
          allDaysNewWords.push(
            statOptData[key].audiochallenge.newWordsPerDay + statOptData[key].sprint.newWordsPerDay,
          );
          allDaysLearnedWordsTemp +=
            statOptData[key].audiochallenge.learnedWordsPerDay +
            statOptData[key].sprint.learnedWordsPerDay;
          allDaysLearnedWords.push(allDaysLearnedWordsTemp);
        }

        this.state.allDaysData = {
          labels: statDataKeys,
          learnedWords: allDaysLearnedWords,
          newWords: allDaysNewWords,
        };
      }
    }
  };
}

export default StatModel;
