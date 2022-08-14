/*
const headerInner = `
<div class="wrapper header__wrapper">
<h1><a href="/">RS Lang</a></h1>
<nav class="nav">
</nav>
</div>
`;
*/

const renderMainTemplate = () => `

<div class="main__container">
<div class="article main__article">
<h2 class="article__title">Погрузись в <span class="accent">океан</span> знаний вместе с RS Lang</h2>
<p class="article__text">Добро пожаловать на образовательную игровую площадку, которая помогает детям выучить английский язык.
  Также, у нас есть миниигры игры, которые помогают улучшить навыки мышления у детей.</p>
  <a href="/textbook" class="btn btn-article" data-btn="textbook"> Начать </a>
  </div>
<div class="whale img-x20">
    <img src="./assets/whale.svg" alt="">
  </div>
  </div>
`;

const footerInner = `<div class="wrapper footer__wrapper">
<div class="footer__copyright">
    <span class="copyright">©</span>
    <span class="year">2022</span>
</div>
<div class="footer__info">
    <a class="github-username" href="https://github.com/ddd-fx" target="_blank" rel="noopener noreferrer">Дмитрий</a>
    <a class="github-username" href="https://github.com/orla90" target="_blank" rel="noopener noreferrer">Ольга</a>
    <a class="github-username" href="https://github.com/OutLaw0" target="_blank" rel="noopener noreferrer">Валентин</a>
</div>
<a href="https://rs.school/js/" class="rss" target="_blank"> Rolling Scopes School </a>
</div>`;

export { footerInner, renderMainTemplate };
