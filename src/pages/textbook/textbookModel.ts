import { TextBookModelInterface, WordsChunkType } from '../../types/textbookTypes';
import { baseURL } from '../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';
import { LocalStorage } from '../../utils/storage';

export class TextBookModel extends TypedEmitter implements TextBookModelInterface {
  wordsChunk: WordsChunkType[];

  constructor() {
    super();
    this.wordsChunk = [];
  }

   firstLoad = async (): Promise<void> => {
    const query = `words?group=${LocalStorage.currUserSettings.currGroup}&page=${LocalStorage.currUserSettings.currPage}`;
    const data = await fetch(baseURL + query).catch();
    this.wordsChunk = await data.json() as WordsChunkType[];
  }

  getTextBookList = async (query: string): Promise<void> => {
    const data = await fetch(baseURL + query).catch();
    this.wordsChunk = await data.json() as WordsChunkType[];
    this.emit('getTextBookList');
    console.log(this.wordsChunk);
  }

  getWordData = (word: WordsChunkType): void => {
    this.emit('getWordData', word);
  }

  getUserDictWords = (query: string): void => {
    // const data = await fetch(baseURL + query).catch();
    // сохранить полученные слова
    this.emit('getUserDict')
    console.log(query);

  }
}
