import { home } from '../components/home.js';
import { register } from '../components/register';
// import { wallTemplate } from '../templates/wallpage.js';

export const router = (hash) => {
  const rootBox = document.getElementById('generalContainer');
  rootBox.innerHTML = '';
  if (hash === '#/' || hash === '/' || hash === '#' || hash === '') {
    rootBox.appendChild(home());
  } else if (hash === '#/home') {
    rootBox.appendChild(home());
  } else if (hash === '#/register') {
    rootBox.appendChild(register());
    //   } else if (hash === '#/wallpage') {
    //     rootBox.appendChild(wallTemplate());
    //   } else if (hash === '#/showpost') {
    //     rootBox.appendChild(wallTemplate());
    //   }
  }
};
