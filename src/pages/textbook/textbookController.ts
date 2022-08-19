import {
    TextBookControllerInterface,
    TextBookModelInterface,
    TextBookViewInterface,
} from '../../types/types';
import { LocalStorage } from '../../utils/storage';

export class TextBookController implements TextBookControllerInterface {
    textBookModel: TextBookModelInterface;

    textBookView: TextBookViewInterface;

    constructor(textBookModel: TextBookModelInterface, textBookView: TextBookViewInterface) {
        this.textBookModel = textBookModel;
        this.textBookView = textBookView;
        this.textBookView.on('textBookBtnClicked', () => this.getTextBookList())
          .on('pageBtnClicked', (page) => this.changeTextBookPage(page))
          .on('groupBtnClicked', (group) => this.changeTextBookGroup(group))
          .on('wordBtnClicked', (id) => this.getWordData(id))
    }

    getTextBookList = (): void => {
        const query = `words?group=${LocalStorage.currUserSettings.currGroup}&page=${LocalStorage.currUserSettings.currPage}`;
        void this.textBookModel.getTextBookList(query);
    }

    changeTextBookPage = (page: number): void => {
        const query = `words?group=${LocalStorage.currUserSettings.currGroup}&page=${page}`;
        LocalStorage.currUserSettings.currPage = page;
        LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings)
        void this.textBookModel.getTextBookList(query);
    }

    changeTextBookGroup = (group: number): void => {
        LocalStorage.currUserSettings.currPage = 0;
        const query = `words?group=${group}&page=${LocalStorage.currUserSettings.currPage}`;
        LocalStorage.currUserSettings.currGroup = group;
        LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings)

        void this.textBookModel.getTextBookList(query);
    }

    getWordData = (id: string): void => {
        const selectedWord = this.textBookModel.wordsChunk.filter((el) => el.id === id);
        this.textBookModel.getWordData(selectedWord[0]);
    }
}
