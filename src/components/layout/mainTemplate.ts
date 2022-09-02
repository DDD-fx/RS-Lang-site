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
<div class="bubbles-top img-x3">
<img src="./assets/bubbles.svg" alt="">
</div>
<div class="skat img-x15">
    <img src="./assets/skat.svg" alt="">
  </div>
<h2 class="article__title">Погрузись в <span class="accent">океан</span> знаний вместе с RS Lang</h2>
<p class="article__text">Добро пожаловать на образовательную игровую площадку, которая помогает детям выучить английский язык.
  Также, у нас есть миниигры игры, которые помогают улучшить навыки мышления у детей.</p>
  <a href="/textbook" class="btn btn-article" data-btn="textbook"> Начать </a>
  <div class="article__bottom-nav"><button class="btn btn-bottom-nav advantages"> О приложении <img class="advantages" src="./assets/icon-right.svg" alt=""></button></div>
  </div>
  <div class="bubbles img-x5">
  <img src="./assets/bubbles.svg" alt="">
</div>
<div class="whale img-x20">

    <img src="./assets/whale.svg" alt="">
  </div>
  </div>
  <!--<div class="main__container advantages-screen">
  <h2 class="article__title">Наши преимущества </h2>
  </div>
  <div class="main__container about-us-screen">
  <h2 class="article__title">О нас </h2>
  </div>-->

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

const preloader = `<div class="loader">
<div class="loading">
  <h2>rslang fetching</h2>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
</div>`;

export { renderMainTemplate, footerInner, preloader };
