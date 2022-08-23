import { TypedEmitter } from 'tiny-typed-emitter';

export type TextBookEventsType = {
  pageBtnClicked: (page: number) => void,
  groupBtnClicked: (group: number) => void,
  wordBtnClicked: (id: string) => void,
  dictBtnClicked: () => void,

  getTextBookList: () => void,
  getWordData: (word: WordsChunkType) => void,
  getUserDict: () => void,
}

export interface TextBookModelInterface extends TypedEmitter<TextBookEventsType> {
  wordsChunk: WordsChunkType[];
  firstLoad(): Promise<void>;
  getTextBookList(query: string): Promise<void>;
  getWordData(word: WordsChunkType): void;
  getUserDictWords(query: string): void;
}

export interface TextBookControllerInterface {
  textBookModel: TextBookModelInterface;
  textBookView: TextBookViewInterface;
  getTextBookList(): void;
  changeTextBookPage(page: number): void;
  changeTextBookGroup(group: number): void;
  getWordData(id: string): void;
  getUserDictWords(): void;
}

export interface TextBookViewInterface extends TypedEmitter<TextBookEventsType> {
  textBookModel: TextBookModelInterface;
  drawTextBook(): void;
  createTextBookMain(): void;
  createDifficultyBtns(): void;
  createWordsBtns({ id, word, wordTranslate, group }: WordsBtnsType): HTMLDivElement;
  createWordCard(word: WordsChunkType): void;
  createAudioBtn(audio: string): HTMLButtonElement;
  createTitleAudioBlock(title: HTMLHeadingElement, audio: HTMLButtonElement): HTMLDivElement;
  createPagination(): void;
  checkGamesBtns(): void;
  checkActiveWordsBtns(wordID: string): void;
  checkActiveDifficultyBtn(activeGroupNum: number): void;
  checkActivePage(currPage: number): void;
  addReadMeListeners(): void;
}

export interface UserTextBookViewInterface extends TypedEmitter<TextBookEventsType> {
  textBookModel: TextBookModelInterface;
  textBookView: TextBookViewInterface;
  drawDict(userDictWords: WordsChunkType[]): void;
  drawUserTextBookView(): void;
  createDifficultWordBtn(): void;
  createDeleteWordBtn(): void;
  addDictBtnListener(): void;
}

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

export type WordsBtnsType = Pick<WordsChunkType, 'id' | 'word' | 'wordTranslate' | 'group'>;
