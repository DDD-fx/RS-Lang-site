import {
  SprintControllerInterface,
  SprintModelInterface,
  SprintViewInterface,
} from '../../../types/games/sprintTypes';
import { MAX_TEXTBOOK_PAGES, SPRINT_GAME_SETTINGS } from '../../../utils/constants';
import { AggregatedWordType, WordsChunkType } from '../../../types/textbookTypes';
import { ApiMethodsEnum, CorrectAnswersStatus, WordStatusEnum } from '../../../types/enums';

export class SprintController implements SprintControllerInterface {
  sprintView: SprintViewInterface;

  sprintModel: SprintModelInterface;

  constructor(SprintModel: SprintModelInterface, SprintView: SprintViewInterface) {
    this.sprintModel = SprintModel;
    this.sprintView = SprintView;
    this.sprintView
      .on('sprintCorrectAnswerClicked', (gameCurrWord: WordsChunkType | AggregatedWordType) =>
        this.checkSprintCorrectAnswer(gameCurrWord),
      )
      .on('sprintIncorrectAnswerClicked', (gameCurrWord: WordsChunkType | AggregatedWordType) =>
        this.checkSprintIncorrectAnswer(gameCurrWord),
      );
  }

  getWordsList = (): void => {
    const page = this.getRandomPage();
    const query = `words?group=${SPRINT_GAME_SETTINGS.level}&page=${page}`;
    void this.sprintModel.getWordsList(query);
  };

  getRandomPage = (): number => {
    const rand = Math.random() * (MAX_TEXTBOOK_PAGES + 1);
    return Math.floor(rand);
  };

  checkSprintCorrectAnswer = (gameCurrWord: WordsChunkType | AggregatedWordType): void => {
    if (
      !SPRINT_GAME_SETTINGS.learnedWords.includes(gameCurrWord.word) &&
      !SPRINT_GAME_SETTINGS.unlearnedWords.includes(gameCurrWord.word)
    ) {
      SPRINT_GAME_SETTINGS.learnedWords.push(gameCurrWord.word);
    }
    const currWord = JSON.parse(JSON.stringify(gameCurrWord)) as
      | WordsChunkType
      | AggregatedWordType;
    if ('userWord' in currWord) {
      currWord.userWord.optional.correctAnswersSprint = `${
        +currWord.userWord.optional.correctAnswersSprint + 1
      }`;
      currWord.userWord.optional.correctSequenceSprint = `${
        +currWord.userWord.optional.correctSequenceSprint + 1
      }`;
      if (
        (currWord.userWord.difficulty === WordStatusEnum.difficult &&
          +currWord.userWord.optional.correctSequenceSprint %
            CorrectAnswersStatus.learnedForDifficult ===
            0) ||
        (currWord.userWord.difficulty === WordStatusEnum.new &&
          +currWord.userWord.optional.correctSequenceSprint % CorrectAnswersStatus.learnedForNew ===
            0)
      )
        currWord.userWord.difficulty = WordStatusEnum.learned;
      void this.sprintModel.updateWordOnSprintAnswer(currWord, ApiMethodsEnum.put);
    } else {
      (<AggregatedWordType>currWord).userWord = {
        difficulty: WordStatusEnum.new,
        optional: {
          correctAnswersChallenge: '0',
          incorrectAnswersChallenge: '0',
          correctSequenceChallenge: '0',
          correctAnswersSprint: '1',
          incorrectAnswersSprint: '0',
          correctSequenceSprint: '1',
        },
      };
      void this.sprintModel.updateWordOnSprintAnswer(
        currWord as AggregatedWordType,
        ApiMethodsEnum.post,
      );
    }
  };

  checkSprintIncorrectAnswer = (gameCurrWord: WordsChunkType | AggregatedWordType): void => {
    if (
      !SPRINT_GAME_SETTINGS.learnedWords.includes(gameCurrWord.word) &&
      !SPRINT_GAME_SETTINGS.unlearnedWords.includes(gameCurrWord.word)
    ) {
      SPRINT_GAME_SETTINGS.unlearnedWords.push(gameCurrWord.word);
    }
    SPRINT_GAME_SETTINGS.unlearnedWords.push(gameCurrWord.word);
    const currWord = JSON.parse(JSON.stringify(gameCurrWord)) as
      | WordsChunkType
      | AggregatedWordType;
    if ('userWord' in currWord) {
      currWord.userWord.optional.incorrectAnswersSprint = `${
        +currWord.userWord.optional.incorrectAnswersSprint + 1
      }`;
      currWord.userWord.optional.correctSequenceSprint = '0';
      if (currWord.userWord.difficulty === WordStatusEnum.learned)
        currWord.userWord.difficulty = WordStatusEnum.difficult;
      void this.sprintModel.updateWordOnSprintAnswer(currWord, ApiMethodsEnum.put);
    } else {
      (<AggregatedWordType>currWord).userWord = {
        difficulty: WordStatusEnum.new,
        optional: {
          correctAnswersChallenge: '0',
          incorrectAnswersChallenge: '0',
          correctSequenceChallenge: '0',
          correctAnswersSprint: '0',
          incorrectAnswersSprint: '1',
          correctSequenceSprint: '0',
        },
      };
      void this.sprintModel.updateWordOnSprintAnswer(
        currWord as AggregatedWordType,
        ApiMethodsEnum.post,
      );
    }
  };
}
