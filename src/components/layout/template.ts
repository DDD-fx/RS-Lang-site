const headerInner = `
<div class="wrapper header__wrapper">
<h1>RS Lang</h1>
<nav class="nav">
</nav>
</div>
`;

const renderMainTemplate = () => `
<div class="img-x20">
    <img src="./assets/whale.svg" alt="">
  </div>
`;


const renderTextbookTemplate = () => `
<div class="img-x15">
    <img src="./assets/skat.svg" alt="">
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

export { headerInner, footerInner, renderMainTemplate, renderTextbookTemplate };
