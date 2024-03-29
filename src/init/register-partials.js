import Handlebars from 'handlebars';
import * as Partials from '../partials';

export const registerPartial = () => {
  Object.entries(Partials).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
  });
};
