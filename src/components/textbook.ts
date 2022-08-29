// eslint-disable-next-line max-lines-per-function
export const renderTextbookTemplate = (): string => `
<div class='textbook-title-wrapper'>
  <button class='textbook-instructions-btn js-textbook-instructions-btn'>Readme</button>
  <h2 class='textbook-title'>Учебник</h2>
  <button class='textbook-dictionary js-textbook-dictionary' disabled>Сложные слова</button>
</div>
<div class='textbook-readme-block hide'>
  <button class='close-readme-btn'>Зыкрыть</button>
  <h2 class='instructions-title'>Руководство</h2>
  <p class='instructions-svg-block'>
    <?xml version='1.0' encoding='iso-8859-1'?>
    <svg class="instructions-bin" fill="#ff0000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 463 463">
    <path d="M375.5,48H295V31.5C295,14.131,280.869,0,263.5,0h-64C182.131,0,168,14.131,168,31.5V48H87.5C65.72,48,48,65.72,48,87.5v24  c0,4.142,3.357,7.5,7.5,7.5H64v288.5c0,10.336,6.71,19.128,16,22.266v9.734c0,12.958,10.542,23.5,23.5,23.5h256  c12.958,0,23.5-10.542,23.5-23.5v-9.734c9.29-3.138,16-11.93,16-22.266V119h8.5c4.143,0,7.5-3.358,7.5-7.5v-24  C415,65.72,397.28,48,375.5,48z M183,31.5c0-9.098,7.402-16.5,16.5-16.5h64c9.098,0,16.5,7.402,16.5,16.5V48h-97V31.5z M79,159.5  c0-4.687,3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5V416h-8.5c-4.687,0-8.5-3.813-8.5-8.5V159.5z M359.5,448h-256  c-4.687,0-8.5-3.813-8.5-8.5V431h273v8.5C368,444.187,364.187,448,359.5,448z M168,416h-17V159.5c0-4.687,3.813-8.5,8.5-8.5  s8.5,3.813,8.5,8.5V416z M240,416h-17V159.5c0-4.687,3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5V416z M312,416h-17V159.5  c0-4.687,3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5V416z M384,407.5c0,4.687-3.813,8.5-8.5,8.5H367V159.5c0-4.687,3.813-8.5,8.5-8.5  s8.5,3.813,8.5,8.5V407.5z M384,137.597c-2.638-1.027-5.503-1.597-8.5-1.597c-12.958,0-23.5,10.542-23.5,23.5V416h-25V159.5  c0-12.958-10.542-23.5-23.5-23.5S280,146.542,280,159.5V416h-25V159.5c0-12.958-10.542-23.5-23.5-23.5S208,146.542,208,159.5V416  h-25V159.5c0-12.958-10.542-23.5-23.5-23.5S136,146.542,136,159.5V416h-25V159.5c0-12.958-10.542-23.5-23.5-23.5  c-2.997,0-5.862,0.57-8.5,1.597V119h305V137.597z M400,104H63V87.5C63,73.991,73.99,63,87.5,63h288c13.51,0,24.5,10.991,24.5,24.5  V104z"/>
    </svg>
    <span><b><i>Добавить слово в изученные.</i></b> <br><br>
      Если слово добавлено в изученные, оно не будет появляться в играх, которые запускаются со страницы
      учебника, но будет присутствовать в играх, которые запускаются из меню. В последнем случае, 
      если в слове будет допущена ошибка, оно автоматически удаляется из изученных. <br><br>
      Кроме того, слово автоматически попадает в изученные, если пользователь правильно угадает его в 
      играх 3 раза подряд. Если же пользователь ошибётся на изученном слове, то оно будет удалено из
      этой категории. <br><br>
      Если все слова на странице являются изученными, то в пагинации учебника данная страница зачёркивается,
      и игры на этой страницы становятся недоступны. <br><br>
      Если отметить изученное слово, как сложное, оно автоматически удалится из изученных.<br><br><br>
      </span>
  </p>
  
  <p class='instructions-svg-block'>
    <?xml version="1.0" encoding="UTF-8"?>
    <svg class='instructions-star' fill="#fffc00" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105 105">
    <path d="M54,5 86,105 1,43H107L22,105"/></svg>
    <span><b><i>Добавить слово в сложные.</i></b> <br><br>
      Все слова, добавленные в сложные, дополнительно отображаются в разделе "Сложные слова". <br><br>
      Сложное слово автоматически попадает в изученные, если пользователь правильно угадает его в 
      играх 5 раза подряд. <br><br>
      Если отметить сложное слово, как изученное, оно автоматически удалится из раздела "Сложные слова".
    </span>
  </p>
  <h2 class='instructions-goodluck'>Удачи в обучении!</h2>
</div>
<p class='textbook-subtitle'>Уровни сложности:</p>
<div class='textbook-difficulty-group js-textbook-difficulty-group'></div>
<div class='textbook-games-block'>
  <h2 class='textbook-games-title'>Игры:</h2>
  <button class='textbook-games-btn textbook-games-btn-challenge'>Аудиовызов</button>
  <button class='textbook-games-btn textbook-games-btn-sprint'>Спринт</button>
</div>
<h2 class='words-title'>Слова для изучения:</h2>
<div class='textbook-words js-textbook-words'>
  <section class='words-btns js-words-btns'></section>
  <article class='word-description js-word-description'></article>
</div>
<div class='pagination js-pagination'></div>
`;

export const renderWordDescription = (): string => `
    <img class='word-description__word-image' src='' alt='word image'>
    <div class='word-description__text-container'>
      <div class='title-audio-block'>
        <h3 class='word-description__word-title'></h3>
      </div>
      <p class='word-description__word-translate'></p>
      <p class='word-description__word-transcript'></p>
      <div class='title-audio-block'>
        <h4 class='word-description__word-meaning-title'>Значение</h4>
      </div>
      <p class='word-description__text-meaning'></p>
      <p class='word-description__text-meaning-translate'></p>
      <div class='title-audio-block'>
        <h4 class='word-description__word-example-title'>Пример</h4>
      </div>
      <p class='word-description__text-example'></p>
      <p class='word-description__text-example-translate'></p>
    </div> `;

export const renderDictTemplate = (): string => `
  <div class='textbook-title-wrapper'>
    <button class='textbook-instructions-btn js-textbook-instructions-btn'>Readme</button>
    <button class='textbook-title-btn'>Вернуться в учебник</button>
    <button class='textbook-dictionary js-textbook-dictionary' disabled>Сложные слова</button>
  </div>
  <div class='textbook-readme-block hide'>
    <button class='close-readme-btn'>Зыкрыть</button>
    <h2 class='instructions'>Руководство</h2>
  </div>
  
  <h2 class='words-title'>Сложные слова:</h2>
  <div class='textbook-words js-textbook-words'>  <!--20 слов-->
    <section class='words-btns js-words-btns user-words js-user-words'></section>
    <article class='word-description js-word-description'></article>
  </div>
  <div class='pagination js-pagination'></div>    <!--30 страниц-->
`;
