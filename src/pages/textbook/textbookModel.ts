import { EventEmitter } from '../../utils/eventEmitter';
import { StateType, TextBookModelInterface, WordsChunkType } from '../../types/types';
import { baseURL } from '../../utils/constants';

export class TextBookModel extends EventEmitter  implements TextBookModelInterface {
    state: StateType;

    wordsChunk: WordsChunkType[];

    constructor() {
        super();
        this.state = {id: ''};
        this.wordsChunk = [];
    }

    async getTextBookList(): Promise<void> {
        const query = 'words?group=0&page=0';
        const data = await fetch(baseURL + query);
        this.wordsChunk = await data.json() as WordsChunkType[];

        console.log(this.wordsChunk);
        this.emit('getTextBookList');
    }
}
