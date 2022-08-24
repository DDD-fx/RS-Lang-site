import { TypedEmitter } from 'tiny-typed-emitter';
import { WordsChunkType } from './textbookTypes';

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
  startSprintGame(): void;
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
  turnThePage: () => void;
};

export interface GamesEntranceControllerInterface {
  gamesEntranceView: GamesEntranceViewInterface;
  gamesEntranceModel: GamesEntranceModelInterface;
}

export interface AudioChallengeControllerInterface {
  audioChallengeView: AudioChallengeViewInterface;
  audioChallengeModel: AudioChallengeModelInterface;
  getWordsList(query: string): void;
  turnGamePage(): void;
  changeSettingsPage(): void;
}

export interface AudioChallengeModelInterface extends TypedEmitter<GamesEventsType> {
  wordsChunk: WordsChunkType[];
  getWordsList(query: string): void;
  turnGamePage(): void;
  changeSettingsPage(): void;
  getNewPage(): void;
}

export interface AudioChallengeViewInterface extends TypedEmitter<GamesEventsType> {
  audioChallengeModel: AudioChallengeModelInterface;
  drawAudioChallengeGame(): void;
  createCloseBtn(): void;
  createWordsBtns({ id, wordTranslate, group }: WordBtnType): HTMLElement;
  createAnswerWrapper(word: string): void;
  updateWordBtnsWrapper(): Element;
  selectRandomSoundingWord(): number;
  createSpeakerWrapper(word: string): void;
  enableWordSounding(): Promise<void>;
  createAnswerWrapper(word: string): void;
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
}

export type WordBtnType = Pick<WordsChunkType, 'id' | 'wordTranslate' | 'group' | 'word'>;

export type AudioChallengeGameType = {
  level: number;
  wordsPerPage: number;
  page: number;
  wordCount: number;
  soundingWordId: string;
};
