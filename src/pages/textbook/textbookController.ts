import {
  AddUserWordBodyType,
  TextBookControllerInterface,
  WordsChunkType,
  WordStatusEnum,
} from '../../types/textbookTypes';
import { TextBookModel } from './textbookModel';
import { TextBookView } from './textbookView';
import { LocalStorage } from '../../utils/storage';

export class TextBookController implements TextBookControllerInterface {
  textBookModel;

  textBookView;

  constructor() {
    this.textBookModel = new TextBookModel();
    this.textBookView = new TextBookView(this.textBookModel);
    this.textBookView
      .on('pageBtnClicked', (page) => this.changeTextBookPage(page))
      .on('groupBtnClicked', (group) => this.changeTextBookGroup(group))
      .on('wordBtnClicked', (id, onDictPage) => this.getWordCardData(id, onDictPage))
      .on('dictBtnClicked', () => this.getUserDictWords())
      .on('addDifficultWordBtnClicked', (wordID, wordStatus) =>
        this.addUserWord(wordID, wordStatus),
      )
      .on('deleteDifficultWordBtnClicked', (wordID, wordStatus) =>
        this.makeWordNew(wordID, wordStatus),
      )
      .on('addLearnedWordBtnClicked', (wordID, wordStatus) => this.addUserWord(wordID, wordStatus))
      .on('deleteLearnedWordBtnClicked', (wordID, wordStatus) =>
        this.makeWordNew(wordID, wordStatus),
      )
      .on('audioChallengeBtnClicked', () => this.getAudioChallengeCollection());
  }

  init = async (): Promise<void> => {
    if (this.textBookView.userTextBookView.onDictPage) {
      this.textBookView.userTextBookView.drawDict();
    } else {
      await this.textBookModel.getTextBookList();
    }
  };

  changeTextBookPage = (page: number): void => {
    LocalStorage.currUserSettings.currPage = page;
    LocalStorage.currUserSettings.currWord = '';
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);
    void this.textBookModel.getTextBookList();
  };

  changeTextBookGroup = (group: number): void => {
    LocalStorage.currUserSettings.currPage = 0;
    LocalStorage.currUserSettings.currWord = '';
    LocalStorage.currUserSettings.currGroup = group;
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);
    void this.textBookModel.getTextBookList();
  };

  getWordCardData = (id: string, onDictPage: boolean): void => {
    LocalStorage.currUserSettings.currWord = id;
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);
    this.textBookModel.getWordCardData(id, onDictPage);
  };

  getUserDictWords = (): void => {
    void this.textBookModel.getUserDictWords();
  };

  addUserWord = async (wordID: string, wordStatus: WordStatusEnum): Promise<void> => {
    const onDictPage = this.textBookView.userTextBookView.onDictPage;

    if (this.isWordDifficult(wordID)) {
      await this.textBookModel.updateUserWord(wordID, onDictPage, wordStatus, false, false);
      this.textBookView.userTextBookView.checkStarBtnActive();
    } else if (this.isWordLearned(wordID)) {
      await this.textBookModel.updateUserWord(wordID, onDictPage, wordStatus, false, false);
      this.textBookView.userTextBookView.checkBinBtnActive();
    } else if (!this.isWordNew(wordID)) {
      const addUserWordReqBody: AddUserWordBodyType = {
        difficulty: wordStatus,
        optional: { test: 'test1111' },
      };
      await this.textBookModel.addUserWord(addUserWordReqBody, wordID);
    } else if (this.isWordNew(wordID)) {
      await this.textBookModel.updateUserWord(wordID, onDictPage, wordStatus, true, false);
    }
  };

  makeWordNew = async (wordID: string, wordStatus: WordStatusEnum): Promise<void> => {
    const onDictPage = this.textBookView.userTextBookView.onDictPage;
    await this.textBookModel.updateUserWord(wordID, onDictPage, wordStatus, false, true);
  };

  isWordNew = (wordID: string): boolean => {
    const newWordsString = JSON.stringify(this.textBookModel.newWords);
    return newWordsString.includes(wordID);
  };

  isWordDifficult = (wordID: string): boolean => {
    const difficultWordsString = JSON.stringify(this.textBookModel.difficultWords);
    return difficultWordsString.includes(wordID);
  };

  isWordLearned = (wordID: string): boolean => {
    const learnedWordsString = JSON.stringify(this.textBookModel.learnedWords);
    return learnedWordsString.includes(wordID);
  };

  getAudioChallengeCollection = (): WordsChunkType[] => {
    if (!LocalStorage.currUserID) {
      return this.textBookModel.wordsChunk;
    }
    const learnedSet = new Set(this.textBookModel.learnedWords.map(({ id }) => id));
    const collection = this.textBookModel.wordsChunk.filter((word) => !learnedSet.has(word.id));
    console.log('getAudioChallengeCollection', collection);
    return collection;
  };
}
