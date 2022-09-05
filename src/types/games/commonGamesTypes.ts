import { TypedEmitter } from 'tiny-typed-emitter';
import { AggregatedWordType, WordsChunkType } from '../textbookTypes';

export interface GamesEntranceViewInterface extends TypedEmitter {
  gamesEntranceModel: GamesEntranceModelInterface;
  buildSprintHTML(): HTMLElement;
  buildAudioChallengeHTML(): HTMLElement;
  createAudioChallengeTitle(): HTMLElement;
  createSprintTitle(): HTMLElement;
  createSprintStartButton(): HTMLElement;
  createAudioChallengeStartButton(): HTMLElement;
  createSprintDescription(): HTMLElement;
  createAudioChallengeDescription(): HTMLElement;
  createSprintImage(): HTMLElement;
  createAudioChallengeImage(): HTMLElement;
  renderPreloader(someClass?: string): void;
  createSelect(): HTMLElement;
}

export interface GamesEntranceModelInterface extends TypedEmitter {
  addGameLevel(level: number): void;
}

export type GamesEventsType = {
  gameOptionClicked: (i: number) => void;
  getWordList: () => void;
  wordBtnClicked: (id: string) => void;
  nextBtnClicked: () => void;
  drawGameBtns: () => void;
  wordsAreOver: () => void;
  wordOfShakedArrCountAdded: () => void;
  pressedContinueGameBtn: () => Promise<void>;
  wrongAnswerClicked: (word: string, flag: boolean) => void;
  rightAnswerClicked: (word: string, flag: boolean) => void;
  theGameIsOver: () => void;
  skipAnswerBtnClicked: () => void;
};

export interface GamesEntranceControllerInterface {
  gamesEntranceView: GamesEntranceViewInterface;
  gamesEntranceModel: GamesEntranceModelInterface;
  startAudioChallengeGame(): Promise<void>;
  startAudioChallengeFromTextBook(
    wordsCollection: WordsChunkType[] | AggregatedWordType[],
  ): Promise<void>;
  startSprintGame(): Promise<void>;
  startSprintGameFromTextBook(
    wordsCollection: WordsChunkType[] | AggregatedWordType[],
  ): Promise<void>;
  addGameLevel(level: number): void;
}

export type WordBtnType = Pick<WordsChunkType, 'id' | 'wordTranslate' | 'group' | 'word'>;
export type ResultBtnType = Pick<WordsChunkType, 'wordTranslate' | 'word'>;
