export const post = () => {
  const postUser = `
<div class="postUser">
    <input class="coment"/>
    <button class="toPost">Publicar</button>
    <button class="close">Cerrar</button>
</div>
<div>
    <button class="deletePost">Eliminar Post</button>
</div>
`;
  const divPostUser = document.createElement('div');
  divPostUser.classList.add('divPosterUser');
  divPostUser.innerHTML = postUser;
  return divPostUser;
};
