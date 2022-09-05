import { TypedEmitter } from 'tiny-typed-emitter';
import { GamesEventsType, ResultBtnType, WordBtnType } from './commonGamesTypes';
import { AggregatedWordType, WordsChunkType } from '../textbookTypes';
import { ApiMethodsEnum, GameEnum } from '../enums';

export interface AudioChallengeControllerInterface {
  audioChallengeView: AudioChallengeViewInterface;
  audioChallengeModel: AudioChallengeModelInterface;
  getWordsList(): Promise<void>;
  turnGamePage(): void;
  getRandomPage(): number;
  changeWord(): void;
  getWordData(id: string, flag: boolean): void;
  getNewWordData(diff: number): Promise<void>;
}
export interface AudioChallengeModelInterface extends TypedEmitter<GamesEventsType> {
  wordsChunk: WordsChunkType[];
  shakedWordChunk: WordsChunkType[];
  getWordsList(query: string): Promise<void>;
  turnGamePage(): void;
  changeWord(): void;
  getWordData(word: string, flag: boolean): void;
  getNewWordData(query: string, diff: number): Promise<void>;
  checkChainOfCorrectAnswers(flag: boolean): void;
  closeBtnModel(): Promise<void>;
  getStatistics(): Promise<void>;
  setStatistics(gameKey: GameEnum): Promise<void>;
  getWordsListFromTextbook(array: WordsChunkType[] | AggregatedWordType[]): void;
  shakeWordsArr(): WordsChunkType[];
  checkChallengeCorrectAnswer(gameCurrWord: AggregatedWordType): Promise<void>;
  checkChallengeIncorrectAnswer(gameCurrWord: AggregatedWordType): Promise<void>;
  updateWordOnChallengeAnswer(currWord: AggregatedWordType, method: ApiMethodsEnum): Promise<void>;
  getUserWords(query: string): Promise<AggregatedWordType | void>;
}

export interface AudioChallengeViewInterface extends TypedEmitter<GamesEventsType> {
  audioChallengeModel: AudioChallengeModelInterface;
  drawAudioChallengeGame(): void;
  createCloseBtn(): void;
  createWordsBtns({ id, wordTranslate, group }: WordBtnType): HTMLElement;
  createAnswerWrapper(word: string): void;
  updateWordBtnsWrapper(): Element;
  createSpeakerWrapper(word: string): void;
  enableWordSounding(): Promise<void>;
  createAnswerSigns(word: string): Element;
  createContinueBtn(): void;
  createSkipBtn(): void;
  getRightAnswer(): string;
  showRightAnswer(): void;
  hideRightAnswer(): void;
  hideSkipBtn(): void;
  showSkipBtn(): void;
  showSign(word: string): void;
  makeWordsTransparent(word: string): void;
  crossWrongWord(word: string): void;
  wordsBtnsDisable(): void;
  createAdditionalWordBtns(): void;
  shakeWordsForCurrentGamePage(): WordsChunkType[];
  createSoundsBtns(): void;
  createSoundBtn(): HTMLElement;
  createStopSoundBtn(): HTMLElement;
  turnOnCorrectAnswerSound(): void;
  turnOnWrongAnswerSound(): void;
  createSpeaker(word: WordsChunkType, className: string): HTMLElement;
  stopTheGame(): void;
  showGameResults(): Promise<void>;
  closeGameResults(): void;
  updateUnlearnedResultWordsWrapper(): Element;
  updateLearnedResultWordsWrapper(): Element;
  createResultWordsBtns({ word, wordTranslate }: ResultBtnType): HTMLElement;
  showOperationPanel(): void;
  createResultsCloseBtn(): HTMLElement;
  checkPressedBtn(e: KeyboardEvent): void;
  handlePressedNumber(pressedKey: string): void;
  handlePressedSpace(): void;
  handlePressedEnter(): void;
  countBarProgress(): void;
  updateProgressBar(value: number): void;
}

export type AudioChallengeGameType = {
  level: number;
  wordsPerPage: number;
  gamePage: number;
  textbookPage: number;
  wordCount: number;
  soundingWordId: string;
  learnedWords: string[];
  unlearnedWords: string[];
  startFromTextbook: boolean;
  wordOfShakedArrCount: number;
  shakedWordsArray: WordsChunkType[];
  sequenceOfCorrectAnswers: number;
  tempSequenceOfCorrectAnswers: number;
  learnedPerGame: number;
  newWords: number;
};
