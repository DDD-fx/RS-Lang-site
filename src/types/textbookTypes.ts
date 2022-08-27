import { TypedEmitter } from 'tiny-typed-emitter';

export type TextBookEventsType = {
  pageBtnClicked: (page: number) => void;
  groupBtnClicked: (group: number) => void;
  wordBtnClicked: (id: string, onDictPage: boolean) => void;
  dictBtnClicked: () => void;
  addDifficultWordBtnClicked: (
    wordID: string,
    wordStatus: WordStatusEnum.difficult,
  ) => Promise<void>;
  deleteDifficultWordBtnClicked: (
    wordID: string,
    onDictPage: boolean,
    wordStatus: WordStatusEnum.difficult,
  ) => void;
  addLearnedWordBtnClicked: (wordID: string, wordStatus: WordStatusEnum.learned) => Promise<void>;
  deleteLearnedWordBtnClicked: (
    wordID: string,
    onDictPage: boolean,
    wordStatus: WordStatusEnum.learned,
  ) => void;

  getTextBookList: () => void;
  getWordData: (word: WordsChunkType) => void;
  getUserDict: () => void;
  addDifficultWord: () => void;
  removeDifficultWordElem: (wordID: string) => void;
};

export interface TextBookModelInterface extends TypedEmitter<TextBookEventsType> {
  wordsChunk: WordsChunkType[];
  aggregatedWords: AggregatedWordType[];
  difficultWords: WordsChunkType[];
  learnedWords: WordsChunkType[];
  getTextBookList(): Promise<void>;
  getWordData(id: string, onDictPage: boolean): void;
  getUserWordsForCurrGroup(query: string, wordStatus: WordStatusEnum): Promise<void>;
  getUserDictWords(): Promise<void>;
  updateUserWords(wordStatus: WordStatusEnum): Promise<void>;
  getUserWords(query: string, wordStatus: WordStatusEnum): Promise<void>;
  addUserWord(addUserWordReq: AddUserWordReqType, wordID: string): Promise<void>;
  deleteUserWord(wordID: string, onDictPage: boolean, wordStatus: WordStatusEnum): Promise<void>;
  getAggregatedWords(query: string): Promise<AggregatedWordType[] | void>;
  mapUserWordsID(difficultWords: AggregatedWordType[]): WordsChunkType[];
}

export interface TextBookControllerInterface {
  textBookModel: TextBookModelInterface;
  textBookView: TextBookViewInterface;
  init(): Promise<void>;
  changeTextBookPage(page: number): void;
  changeTextBookGroup(group: number): void;
  getWordData(id: string, onDictPage: boolean): void;
  getUserDictWords(): void;
  addUserWord(wordID: string, wordStatus: WordStatusEnum): Promise<void>;
  deleteUserWord(wordID: string, onDictPage: boolean, wordStatus: WordStatusEnum): void;
  checkCollection(wordID: string, wordStatus: WordStatusEnum): Promise<void>;
}

export interface TextBookViewInterface extends TypedEmitter<TextBookEventsType> {
  textBookModel: TextBookModelInterface;
  userTextBookView: UserTextBookViewInterface;
  textBookViewUtils: TextBookViewUtilsInterface;
  drawTextBook(): void;
  createWordsGroupBtns(): void;
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
  drawUserTextBookElems(): void;
  createStarBtn(): void;
  createBinBtn(): void;
  removeDictElem(wordID: string): void;
  addBackToTextBookListenerBtn(): void;
  addDictBtnListener(): void;
  makeStarBtnActive(): void;
  checkStarBtnActive(): void;
  checkBinBtnActive(): void;
}

export interface TextBookViewUtilsInterface extends TypedEmitter<TextBookEventsType> {
  textBookModel: TextBookModelInterface;
  textBookView: TextBookViewInterface;
  createTextBookMain(template: string): void;
  addReadMeListeners(): void;
  checkGamesBtnsColor(): void;
  getCurrCollection(): WordsChunkType[];
  checkActiveWordsBtns(wordID: string): void;
  checkActiveDifficultyBtn(activeGroupNum: number): void;
  checkActivePage(currPage: number): void;
  disableDictBtn(): void;
  getStarBtn(wordID: string): SVGElement;
  getBinBtn(wordID: string): SVGElement;
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

export type AddUserWordReqType = {
  difficulty: WordStatusEnum;
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
  learned = '0',
  difficult = '1',
}
