document.addEventListener('DOMContentLoaded', async function () {
  const sesion = await apiFetch('/me');

  if (!sesion.ok) {
    window.location.href = RUTAS.login;
    return;
  }
  // Un administrador que entre acá vuelve a su dashboard
  if (esAdministrador(sesion.datos.usuario)) {
    window.location.href = RUTAS.dashboard;
    return;
  }

  document.getElementById('usuario-nombre').textContent = sesion.datos.usuario.nombre;
  document.getElementById('usuario-contenido').classList.remove('d-none');
  document.getElementById('usuario-logout').addEventListener('click', cerrarSesion);
});
