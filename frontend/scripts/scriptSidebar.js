// seleccionamos todos los botones del menú
const botones = document.querySelectorAll('#default-sidebar li[data-target]');

botones.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target; // contenedor a mostrar
    const contenedor = document.getElementById(targetId)

    // ocultar todos los contenedores primero
    document.querySelectorAll('#contenidoPrincipal, #contFormularioCrearUsuario, #contFormularioBuscarUsuarios, #contFormularioEliminarUsuario, #contFormularioModificarUsuario, #contFormularioCrearPost')
      .forEach(c => c.classList.add('hidden'))

    // mostrar el seleccionado
    contenedor.classList.remove('hidden')
  })
})
