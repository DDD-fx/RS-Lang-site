import { TextBookControllerInterface, TextBookModelInterface, TextBookViewInterface } from '../../types/types';

export class TextBookController implements TextBookControllerInterface  {
    textbookModel: TextBookModelInterface;

    textbookView: TextBookViewInterface;

    constructor(textBookModel: TextBookModelInterface, textBookView: TextBookViewInterface) {
        this.textbookModel = textBookModel;
        this.textbookView = textBookView;
        this.textbookView.on('textBookBtnClicked', () => this.getTextBookList())
    }

    getTextBookList(): void {
        console.log('contr');
        this.textbookModel.getTextBookList();
    }
}
