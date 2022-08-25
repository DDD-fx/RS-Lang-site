import { TypedEmitter } from 'tiny-typed-emitter';

export type TextBookEventsType = {
  pageBtnClicked: (page: number) => void;
  groupBtnClicked: (group: number) => void;
  wordBtnClicked: (id: string) => void;
  dictBtnClicked: () => void;
  addDifficultWordBtnClicked: (wordID: string) => void;
  deleteUserWordBtnClicked: (wordID: string) => void;

  getTextBookList: () => void;
  getWordData: (word: WordsChunkType) => void;
  getUserDict: () => void;
  addDifficultWord: () => void;
};

export interface TextBookModelInterface extends TypedEmitter<TextBookEventsType> {
  wordsChunk: WordsChunkType[];
  aggregatedWords: AggregatedWordType[];
  difficultWords: AggregatedWordType[];
  getTextBookList(): Promise<void>;
  getWordData(word: WordsChunkType): void;
  getUserDictWords(): void;
  addDifficultWord(addDifficultWordReq: AddDifficultWordReqType, wordID: string): Promise<void>;
  getDifficultWordsForCurrGroup(): Promise<void>;
  getDifficultWords(query: string): Promise<void>;
  getDifficultWords(query: string): Promise<void>;
  getAggregatedWords(query: string): Promise<AggregatedWordType[] | void>;
  deleteUserWord(wordID: string): Promise<void>;
}

export interface TextBookControllerInterface {
  textBookModel: TextBookModelInterface;
  textBookView: TextBookViewInterface;
  getTextBookList(): void;
  changeTextBookPage(page: number): void;
  changeTextBookGroup(group: number): void;
  getWordData(id: string): void;
  getUserDictWords(): void;
  addDifficultWord(wordID: string): void;
  deleteUserWord(wordID: string): void;
}

export interface TextBookViewInterface extends TypedEmitter<TextBookEventsType> {
  textBookModel: TextBookModelInterface;
  userTextBookView: UserTextBookViewInterface;
  textBookViewUtils: TextBookViewUtilsInterface;
  drawTextBook(): void;
  createDifficultyBtns(): void;
  appendWordsBtns(): void;
  createWordsBtns({ id, word, wordTranslate, group }: WordsBtnsType): HTMLDivElement;
  createWordCard(word: WordsChunkType | AggregatedWordType): void;
  createAudioBtn(audio: string): HTMLButtonElement;
  createTitleAudioBlock(title: HTMLHeadingElement, audio: HTMLButtonElement): HTMLDivElement;
  createPagination(): void;
}

export interface UserTextBookViewInterface extends TypedEmitter<TextBookEventsType> {
  textBookModel: TextBookModelInterface;
  textBookView: TextBookViewInterface;
  onDictPage: boolean;
  drawDict(): void;
  drawUserTextBookView(): void;
  appendUserWordsBtns(): void;
  createStarBtn(): void;
  createBinBtn(): void;
  addBackToTextBookListenerBtn(): void;
  addDictBtnListener(): void;
  makeStarBtnActive(): void;
}

export interface TextBookViewUtilsInterface extends TypedEmitter<TextBookEventsType> {
  textBookModel: TextBookModelInterface;
  textBookView: TextBookViewInterface;
  createTextBookMain(template: string): void;
  addReadMeListeners(): void;
  checkGamesBtnsColor(): void;
  checkActiveWordsBtns(wordID: string): void;
  checkActiveDifficultyBtn(activeGroupNum: number): void;
  checkActivePage(currPage: number): void;
  disableDictBtn(): void;
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

export type AddDifficultWordReqType = {
  difficulty: string;
  optional: { test: 'test' };
};

export type AddUserWordRespType = {
  difficulty: string;
  optional: string;
  id: string; // ещё один ID генерируется на серваке для добавленного слова
  wordId: string;
};

export type AggregatedWordsRespType = {
  paginatedResults: AggregatedWordType[];
  totalCount: [
    {
      count: number;
    },
  ];
};

export type AggregatedWordType = Omit<WordsChunkType, 'id'> & {
  _id: string;
  userWord: UserWordType;
};

export type UserWordType = {
  difficulty: WordStatusEnum;
  optional: Record<string, never>;
};

export enum WordStatusEnum {
  learned,
  difficult,
}
