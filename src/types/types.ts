import { TypedEmitter } from 'tiny-typed-emitter';

type Routes = {
  path: string;
  action: () => void;
};

type HistoryLocation = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: null | unknown;
};

export { Routes, HistoryLocation };

export type TextBookEventsType = {
  textBookBtnClicked: () => void,
  pageBtnClicked: (page: number) => void,
  groupBtnClicked: (group: number) => void,
  wordBtnClicked: (id: string) => void,

  getTextBookList: () => void,
  getWordData: (word: WordsChunkType) => void,
}

export interface TextBookControllerInterface {
  textBookModel: TextBookModelInterface;
  textBookView: TextBookViewInterface;
  getTextBookList(): void;
  changeTextBookPage(page: number): void;
  changeTextBookGroup(group: number): void;
  getWordData(id: string): void;
}

export interface TextBookViewInterface extends TypedEmitter<TextBookEventsType> {
  textBookModel: TextBookModelInterface;
  drawTextBook(wordsChunk: WordsChunkType): void;
  createDifficultyBtns(): void;
  createWordsBtns({ word, wordTranslate }: WordsBtnsType): HTMLButtonElement;
  createWordCard(word: WordsChunkType): void;
  createAudioBtn(audio: string): HTMLButtonElement;
  createTitleAudioBlock(title: HTMLHeadingElement, audio: HTMLButtonElement): HTMLDivElement
  createPagination(): void;
  checkActiveWordsBtns(): void;
  checkActiveDifficultyBtn(activeGroupNum: number): void;
  checkActivePage(currPage: number): void;
}

export interface TextBookModelInterface extends TypedEmitter<TextBookEventsType> {
  // state: StateType;
  wordsChunk: WordsChunkType[];
  getTextBookList(query: string): void;
  getWordData(word: WordsChunkType): void;
}

export type StateType = {
  id: string;
  currPage: number;
  currGroup: number;
};

export type WordsChunkType = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
};

export type WordsBtnsType = Pick<WordsChunkType, 'id' | 'word' | 'wordTranslate'>;

export type LocalStorageType = {
  userId: UserSettingsType;
}

export type UserSettingsType = {
  userEmail: string;
  userName: string;
  avatarURL: string;
  token: string;
  refreshToken: string;
  stats: string;  //obj?
  currPage: number;
  currGroup: number;
  currWord: number;
}
