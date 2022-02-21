import { home } from '../components/home.js';
import { register } from '../components/register.js';
import { eventsRegister, login } from './index.js';
// import { wallTemplate } from '../templates/wallpage.js';

export const router = (hash) => {
  const rootBox = document.getElementById('Container');
  rootBox.innerHTML = '';
  if (hash === '#/' || hash === '/' || hash === '#' || hash === '') {
    rootBox.appendChild(home());
    login();
  } else if (hash === '#/home') {
    rootBox.appendChild(home());
    login();
  } else if (hash === '#/register') {
    rootBox.appendChild(register());
    eventsRegister();
    //   } else if (hash === '#/wallpage') {
    //     rootBox.appendChild(wallTemplate());
    //   } else if (hash === '#/showpost') {
    //     rootBox.appendChild(wallTemplate());
    //   }
  }
};