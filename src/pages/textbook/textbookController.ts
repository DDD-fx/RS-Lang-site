import {
  AddUserWordBodyType,
  AggregatedWordType,
  TextBookControllerInterface,
  WordsChunkType,
} from '../../types/textbookTypes';
import { TextBookModel } from './textbookModel';
import { TextBookView } from './textbookView';
import { LocalStorage } from '../../utils/storage';
import { WORDS_PER_TEXTBOOK_PAGE } from '../../utils/constants';
import { GameEnum, WordStatusEnum } from '../../types/enums';

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
      );
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
        optional: {
          correctAnswersChallenge: '0',
          incorrectAnswersChallenge: '0',
          correctAnswersSprint: '0',
          incorrectAnswersSprint: '0',
        },
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

  getGamesWordCollection = async (
    game: GameEnum,
  ): Promise<WordsChunkType[] | AggregatedWordType[]> => {
    if (!LocalStorage.currUserID) {
      return this.textBookModel.wordsChunk;
    }
    const rawCollection = await this.textBookModel.getWordsForGames();
    if (rawCollection) {
      const rawCollectionForCurrPage = rawCollection.filter(
        (wordData) => wordData.page <= LocalStorage.currUserSettings.currPage,
      );
      if (LocalStorage.currUserSettings.currPage === 0)
        return this.textBookModel.mapUserWordsID(rawCollectionForCurrPage);

      if (rawCollectionForCurrPage.length > 20 && game === GameEnum.audioChallenge) {
        return this.textBookModel.mapUserWordsID(
          rawCollectionForCurrPage.slice(-WORDS_PER_TEXTBOOK_PAGE),
        );
      } else return this.textBookModel.mapUserWordsID(rawCollectionForCurrPage);
    } else {
      throw new Error('collection gathering failed');
    }
  };
}
