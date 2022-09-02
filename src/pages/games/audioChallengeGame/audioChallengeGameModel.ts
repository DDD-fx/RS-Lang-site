import {
  AUDIOCHALLENGE_GAME_SETTINGS,
  baseURL,
  WORDS_PER_TEXTBOOK_PAGE,
} from '../../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';
import {
  AddUserWordBodyType,
  AggregatedWordsRespType,
  AggregatedWordType,
  WordsChunkType,
} from '../../../types/textbookTypes';
import { LocalStorage } from '../../../utils/storage';
import { authFetch } from '../../../model/model';
import { AudioChallengeModelInterface } from '../../../types/games/audioChallengeTypes';
import { WordStatusEnum } from '../../../types/enums';

export class AudioChallengeModel extends TypedEmitter implements AudioChallengeModelInterface {
  wordsChunk: WordsChunkType[];

  shakedWordChunk: WordsChunkType[];

  constructor() {
    super();
    this.wordsChunk = [];
    this.shakedWordChunk = [];
  }

  getWordsList = async (query: string): Promise<void> => {
    const data = await fetch(baseURL + query);
    this.wordsChunk = await data.json();
    this.shakedWordChunk = this.shakeWordsArr();
  };

  getWordsListFromTextbook = (
    array: WordsChunkType[] | AggregatedWordType[]
  ): void => {
    this.wordsChunk = array.slice();
    this.shakedWordChunk = this.shakeWordsArr();
  };

  shakeWordsArr = (): WordsChunkType[] => {
    const wordsArr = JSON.parse(JSON.stringify(this.wordsChunk));
    for (let i = this.wordsChunk.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordsArr[i], wordsArr[j]] = [wordsArr[j], wordsArr[i]];
    }
    return wordsArr;
  };

  turnGamePage = (): void => {
    AUDIOCHALLENGE_GAME_SETTINGS.wordCount +=
      AUDIOCHALLENGE_GAME_SETTINGS.wordsPerPage;
    this.emit('drawGameBtns');
  };

  changeWord = (): void => {
    if (
      AUDIOCHALLENGE_GAME_SETTINGS.wordOfShakedArrCount <
      WORDS_PER_TEXTBOOK_PAGE
    ) {
      AUDIOCHALLENGE_GAME_SETTINGS.wordOfShakedArrCount += 1;
    }
  };

  getWordData = async (id: string, flag: boolean) => {
    AUDIOCHALLENGE_GAME_SETTINGS.tempSequenceOfCorrectAnswers += 1;
    const userId = LocalStorage.currUserSettings.userId;
    let UserWord;
        const DefaultUserWord = {
          difficulty: 2,
          optional: {
            correctAnswersChallenge: 0,
            incorrectAnswersChallenge: 0,
            correctAnswersSprint: 0,
            incorrectAnswersSprint: 0,
          },
        };
    if (userId) {
      // const query = `users/${LocalStorage.currUserSettings.userId}/aggregatedWords?group=${LocalStorage.currUserSettings.currGroup}&wordsPerPage=600"}`;
      const query = `users/${userId}/aggregatedWords/${id}`;
      const word = await this.getUserWords(query);
      if (word) {
        if (word.userWord) {
          UserWord = word.userWord;
        } else {
          UserWord = DefaultUserWord;
        }

        if (flag === true) {
          UserWord.optional.correctAnswersChallenge = (
            +UserWord.optional.correctAnswersChallenge + 1
          ).toString();
          // UserWord.optional.correctSequenceChallenge = (+UserWord.optional.correctSequenceChallenge + 1).toString();
        } else if (flag === false) {
          UserWord.optional.incorrectAnswersChallenge = (
            +UserWord.optional.incorrectAnswersChallenge + 1
          ).toString();
          // UserWord.optional.correctSequenceChallenge = 0;
        }

        if (UserWord.difficulty === '0' && flag === false) {
          UserWord.difficulty = WordStatusEnum.new;
        } else if (UserWord.difficulty === '1' && flag === true) {
          if (UserWord.optional.correctAnswersChallenge === '5') {
            UserWord.difficulty = WordStatusEnum.learned;
          }
        } else if (UserWord.difficulty === '2' && flag === true) {
          if (UserWord.optional.correctAnswersChallenge === '3') {
            UserWord.difficulty = WordStatusEnum.learned;
          }
        }
        this.updateWord(userId, id, UserWord as AddUserWordBodyType);
      }
    }
  };

  updateWord = async (userId: string, id: string, UserWord: AddUserWordBodyType) => {
    const query = `/users/${userId}/words/${id}`;
    try {
      const rawResponse = await authFetch(
        baseURL + query,
        {
          method: 'PUT',
          body: JSON.stringify(UserWord),
          headers: {
            Authorization: `Bearer ${LocalStorage.currUserSettings.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      const content = (await rawResponse.json()) as AggregatedWordType[];
      console.log(content[0]);
    } catch (e) {
      console.error(e);
    }
  };

  getUserWords = async (query: string): Promise<AggregatedWordType | void> => {
    try {
      const rawResponse = await authFetch(baseURL + query, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${LocalStorage.currUserSettings.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const content = (await rawResponse.json()) as AggregatedWordType[];
      return content[0];
    } catch (e) {
      console.error(e);
    }
  };

  getNewWordData = async (query: string, diff: number) => {
    const promise = await fetch(baseURL + query);
    const data = await promise.json();
    for (let i = 0; i < diff; i += 1) {
      await AUDIOCHALLENGE_GAME_SETTINGS.shakedWordsArray.push(
        data[Math.floor(Math.random() * (data.length - 1))]
      );
    }
  };

  resetСhainOfCorrectAnswers = (word: string) => {
    this.stopСhainOfCorrectAnswers;
  };

  stopСhainOfCorrectAnswers = () => {
    if (
      AUDIOCHALLENGE_GAME_SETTINGS.tempSequenceOfCorrectAnswers >
      AUDIOCHALLENGE_GAME_SETTINGS.sequenceOfCorrectAnswers
    ) {
      AUDIOCHALLENGE_GAME_SETTINGS.sequenceOfCorrectAnswers =
        AUDIOCHALLENGE_GAME_SETTINGS.tempSequenceOfCorrectAnswers;
      AUDIOCHALLENGE_GAME_SETTINGS.tempSequenceOfCorrectAnswers = 0;
    }
  };
}
