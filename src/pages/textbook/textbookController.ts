import {
  AddDifficultWordReqType,
  TextBookControllerInterface,
  TextBookModelInterface,
  TextBookViewInterface,
} from '../../types/textbookTypes';
import { LocalStorage } from '../../utils/storage';

export class TextBookController implements TextBookControllerInterface {
  textBookModel;

  textBookView;

  constructor(textBookModel: TextBookModelInterface, textBookView: TextBookViewInterface) {
    this.textBookModel = textBookModel;
    this.textBookView = textBookView;
    this.textBookView
      .on('pageBtnClicked', (page) => this.changeTextBookPage(page))
      .on('groupBtnClicked', (group) => this.changeTextBookGroup(group))
      .on('wordBtnClicked', (id) => this.getWordData(id))
      .on('dictBtnClicked', () => this.getUserDictWords())
      .on('addDifficultWordBtnClicked', (wordID) => this.addDifficultWord(wordID))
      .on('deleteUserWordBtnClicked', (wordID) => this.deleteUserWord(wordID));
  }

  getTextBookList = (): void => {
    void this.textBookModel.getTextBookList();
  };

  changeTextBookPage = (page: number): void => {
    LocalStorage.currUserSettings.currPage = page;
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);

    void this.textBookModel.getTextBookList();
  };

  changeTextBookGroup = (group: number) => {
    LocalStorage.currUserSettings.currPage = 0;
    LocalStorage.currUserSettings.currGroup = group;
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);

    void this.textBookModel.getTextBookList();
    LocalStorage.currUserSettings.currWord = this.textBookModel.wordsChunk[0].id;
  };

  getWordData = (id: string): void => {
    LocalStorage.currUserSettings.currWord = id;
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);

    this.textBookModel.getWordData(id);
  };

  getUserDictWords = (): void => {
    void this.textBookModel.getUserDictWords(this.textBookView.userTextBookView.onDictPage);
  };

  addDifficultWord = (wordID: string): void => {
    const addDifficultWordReq: AddDifficultWordReqType = {
      difficulty: '1',
      optional: { test: 'test' },
    };
    void this.textBookModel.addDifficultWord(addDifficultWordReq, wordID);
  };

  deleteUserWord = (wordID: string): void => {
    const onDictPage = this.textBookView.userTextBookView.onDictPage;
    void this.textBookModel.deleteUserWord(wordID, onDictPage);
  };
}
