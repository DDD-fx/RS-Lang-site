import { TypedEmitter } from 'tiny-typed-emitter';
import { WordsChunkType } from '../textbookTypes';

export interface GamesEntranceViewInterface extends TypedEmitter<GamesEntranceEventType> {
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
}

export interface GamesEntranceModelInterface extends TypedEmitter<GamesEntranceEventType> {
  addGameLevel(level: number): void;
}

export type GamesEntranceEventType = {
  audioChallengeGameStarted(): void;
  sprintGameStarted(): void;
  drawChallenge(): void;
  gameOptionClicked: (level: number) => void;
};

export type GamesEventsType = {
  sprintGameStarted: () => void;
  audioChallengeGameStarted: () => void;
  gameOptionClicked: (i: number) => void;
  getWordList: () => void;
  wordBtnClicked: (id: string) => void;
  nextBtnClicked: () => void;
  drawGameBtns: () => void;
  wordsAreOver: () => void;
  wordOfShakedArrCountAdded: () => void;
  pressedContinueGameBtn: () => void;
  wrongAnswerClicked: (word: string) => void;
  rightAnswerClicked: (word: string) => void;
};

export interface GamesEntranceControllerInterface {
  gamesEntranceView: GamesEntranceViewInterface;
  gamesEntranceModel: GamesEntranceModelInterface;
}

export type WordBtnType = Pick<WordsChunkType, 'id' | 'wordTranslate' | 'group' | 'word'>;
export type ResultBtnType = Pick<WordsChunkType, 'wordTranslate' | 'word'>;
