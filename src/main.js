import Handlebars from 'handlebars';
import { registerPartial } from './init/register-partials';
import * as Pages from './pages';
import './style.css';

registerPartial();

const pages = {
  nav: [Pages.Navigation],
  login: [Pages.Login],
};

function navigate(page) {
  const [source, context] = pages[page];
  const container = document.getElementById('app');
  container.innerHTML = Handlebars.compile(source)(context);
}
document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', (e) => {
  const page = e.target.getAttribute('page');

  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
