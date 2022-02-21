import { logout } from '../lib/index.js';
export const wall = () => {
const wall = `
<header>
<button >Inicio</button>
<button>Muro</button>
<button>Agregar</button>
<button class="logout" id="logout">Salir</button>
</header>
`;
const divHeader= document.createElement('div');
divHeader.innerHTML = wall;
const buttonLogout = divHeader.querySelector('.logout');
if(buttonLogout){buttonLogout.addEventListener('click', () =>{
    logout();
})
};


return divHeader;
};
