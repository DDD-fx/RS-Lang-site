import { EventEmitter } from '../../utils/eventEmitter';
import { TextBookModelInterface, TextBookViewInterface, WordsBtnsType } from '../../types/types';
import { getElement } from '../../utils/tools';
import renderTextbookTemplate from '../../components/textbook';

export class TextBookView extends EventEmitter implements TextBookViewInterface {
    textBookModel: TextBookModelInterface;

    constructor(textBookModel: TextBookModelInterface) {
        super();
        this.textBookModel = textBookModel;
        this.textBookModel.on('getTextBookList', () => this.drawTextBook())
    }

    drawTextBook(): void {
        const mainWrapper = getElement('main__wrapper');
        const textbook = renderTextbookTemplate();
        mainWrapper.innerHTML = '';
        mainWrapper.insertAdjacentHTML('afterbegin', textbook);
        const div = getElement('js-words-btns');
        this.textBookModel.wordsChunk.forEach((wordObj) => {
            div.append(this.createWordsBtns({
                word: wordObj.word,
                wordTranslate: wordObj.wordTranslate,
            }));
        })
    };

    createTextBookBtn(): void {
        const div = getElement('header__wrapper');
        const btn = document.createElement('a');
        btn.textContent = 'Учебник';

        btn.addEventListener('click', () => this.emit('textBookBtnClicked'));

        div.append(btn);
    }

    createWordsBtns({ word, wordTranslate }: WordsBtnsType): HTMLButtonElement {
        const wordBtn = document.createElement('button');
        const wordTitle = document.createElement('h3');
        wordTitle.textContent = word;
        const wordTranslation = document.createElement('p');
        wordTranslation.textContent = wordTranslate;
        wordBtn.append(wordTitle, wordTranslation);
        return wordBtn;
    }
}
