const renderTextbookTemplate = () => `
<!--<div class="img-x15">
    <img src="../assets/skat.svg" alt="">
</div>-->

<h2 class="textbook-title">Учебник</h2>
<p class="textbook-subtitle">Уровни сложности</p>
<div class="textbook-difficulty-group js-textbook-difficulty-group"></div>

<h2 class="words-title">Слова</h2>

<div class="textbook-words js-textbook-words">  <!--20 слов-->
    <section class="words-btns js-words-btns"></section>
    <article class="word-description js-word-description"></article>
</div>
<div class="pagination js-pagination">    <!--30 страниц-->
  <button class="pagination__prev-page js-pagination__prev-page">&#60;</button>
  <button class="pagination__next-page js-pagination__next-page">&#62;</button>
</div>

`;

export default renderTextbookTemplate;
