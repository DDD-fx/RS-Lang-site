export const renderTextbookTemplate = () => `
<!--<div class="img-x15">
    <img src="../assets/skat.svg" alt="">
</div>-->

<div class='textbook-title-wrapper'>
  <button class='textbook-instructions-btn js-textbook-instructions-btn'>Readme</button>
  <h2 class='textbook-title'>Учебник</h2>
  <button class='textbook-dictionary js-textbook-dictionary'>Сложные слова</button>
</div>
<div class='textbook-readme-block hide'>
<button class='close-readme-btn'>Зыкрыть</button>
<h2 class='instructions'>Руководство</h2>
</div>

<p class='textbook-subtitle'>Уровни сложности:</p>
<div class='textbook-difficulty-group js-textbook-difficulty-group'></div>

<div class='textbook-games-block'>
  <h2 class='textbook-games-title'>Игры:</h2>
  <button class='textbook-games-btn textbook-games-btn-challenge'>Аудиовызов</button>
  <button class='textbook-games-btn textbook-games-btn-sprint'>Спринт</button>
</div>

<h2 class='words-title'>Слова для изучения:</h2>

<div class='textbook-words js-textbook-words'>  <!--20 слов-->
    <section class='words-btns js-words-btns'></section>
    <article class='word-description js-word-description'></article>
</div>
<div class='pagination js-pagination'>    <!--30 страниц-->
</div>
`;

export const renderDictTemplate = () => `
  <div class='textbook-title-wrapper'>
    <button class='textbook-instructions-btn js-textbook-instructions-btn'>Readme</button>
    <button class='textbook-title-btn'>Вернуться Учебник</button>
    <button class='textbook-dictionary js-textbook-dictionary' disabled>Сложные слова</button>
  </div>
  <div class='textbook-readme-block hide'>
    <button class='close-readme-btn'>Зыкрыть</button>
    <h2 class='instructions'>Руководство</h2>
  </div>
`;
