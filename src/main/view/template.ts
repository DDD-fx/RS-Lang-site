const headerInner = `
<div class="wrapper header__wrapper">
<h1>RS Lang</h1>
<nav class="nav">
<ul class="nav__list">
<li>
  <button class="btn" data-btn="main"> Главная </button>
</li>
<li>
  <button class="btn" data-btn="textbook"> Учебник </button>
</li>
<li>
  <button class="btn" data-btn="games"> Игры </button>
</li>
<li>
  <button class="btn" data-btn="stat"> Статистика </button>
</li>
<li>
  <button class="btn inactive" data-btn="login"> Login </button>
</li>
</ul>
</nav>
</div>
`;

const renderMainTemplate = () => `
<div class="wrapper">
<div class="whale">
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

export { headerInner, footerInner, renderMainTemplate };
