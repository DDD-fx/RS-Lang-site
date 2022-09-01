const instructions = `
  <button class='close-readme-btn'>Зыкрыть</button>
  <h2 class='instructions-title'>Руководство</h2>
  <p class='instructions-svg-block'>
    <?xml version="1.0" encoding="utf-8"?>
    <svg class="instructions-bin" fill="#069b00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
    <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M8388.5,4309c-130-26-290-94-396.1-164c-64-44-844.1-892.1-2288.4-2496.4C4497.9,312.4,3487.7-807.8,3457.7-837.8l-54-58l-698.1,604.1c-782.1,674.1-880.1,740.1-1170.2,782.1c-306,44-652.1-66-868.1-276C229.2-207.7,75.2-509.7,103.2-893.8c22-292,132-496.1,406.1-758.1c610.1-582.1,2448.4-2242.4,2554.4-2306.4c180-110,308.1-144,544.1-144c156,0,230,12,336,48c290,98,190-12,3104.5,3378.5c1840.3,2142.3,2706.4,3160.5,2740.4,3234.5c150,304,148,688.1-4,978.1c-64,122-384.1,446.1-572.1,580.1c-176,126-376.1,194-584.1,204C8540.5,4325,8432.5,4319,8388.5,4309z"/></g></g>
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
  </p> <br><br>
  <div class='other-instructions'>
    <p>Если игра запускается со страницы учебника, то в неё попадают только слова с текущей страницы. Если пользователь авторизован,
    то в игру будут попадать только неизученные слова с текущей или предыдущих страниц учебника.
    </p>
    <p>Игры и дополнительный функционал на странице учебника недоступны неавторизованным пользователям.</p>
  </div>
  <h2 class='instructions-goodluck'>Удачи в обучении!</h2>
`;

export const renderTextbookTemplate = (): string => `
<div class='textbook-title-wrapper'>
  <button class='textbook-instructions-btn js-textbook-instructions-btn'>Readme</button>
  <h2 class='textbook-title'>Учебник</h2>
  <button class='textbook-dictionary js-textbook-dictionary' disabled>Сложные слова</button>
</div>
<div class='textbook-readme-block hide'>
  ${instructions}
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
    ${instructions}
  </div>
  
  <h2 class='words-title'>Сложные слова:</h2>
  <div class='textbook-words js-textbook-words'>
    <section class='words-btns js-words-btns user-words js-user-words'></section>
    <article class='word-description js-word-description'></article>
  </div>
`;

export const renderWordDescriptionGamesBlock = (): string => `
<h4 class='word-description__stats-title'>Слово было угадано в играх:</h4>
<div class='word-description__stats-block'>
  <div class='word-description__game-stats-block'>
    <p>Аудиовызов:</p>
    <p class='word-description__challenge-stats'></p>
  </div>
  <div class='word-description__game-stats-block'>
    <p>Спринт:</p>
    <p class='word-description__sprint-stats'></p>
  </div>
</div>
`;
