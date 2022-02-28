import { home } from '../components/home.js';
import { register } from '../components/register.js';
import { wall } from '../components/wall.js';
import { eventsRegister, Iniciargoogle, login } from './index.js';
// import { sendLinkEMail, login } from './index.js';

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
    // sendLinkEMail();
  } else if (hash === '#/wall') {
    rootBox.appendChild(wall());
  // } else if (hash === '#/restorePassword') {
  //   rootBox.appendChild(recoverPassword());
  // }
  }
};
