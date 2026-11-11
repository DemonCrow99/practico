document.addEventListener('DOMContentLoaded', async function () {
  // Protección de la página: hay que estar logueado y ser administrador
  const sesion = await apiFetch('/me');

  if (!sesion.ok) {
    window.location.href = RUTAS.login;
    return;
  }
  if (!esAdministrador(sesion.datos.usuario)) {
    window.location.href = RUTAS.usuario;
    return;
  }

  // Doble control: el endpoint administrativo valida el rol en el servidor (401/403)
  const resumen = await apiFetch('/admin/resumen');
  if (resumen.estado === 401) { window.location.href = RUTAS.login; return; }
  if (resumen.estado === 403) { window.location.href = RUTAS.usuario; return; }
  if (resumen.ok) {
    document.getElementById('stat-libros').textContent = resumen.datos.libros;
    document.getElementById('stat-usuarios').textContent = resumen.datos.usuarios;
  }

  const usuario = sesion.datos.usuario;
  document.getElementById('panel-nombre').textContent = usuario.nombre;
  document.getElementById('panel-rol').textContent = usuario.rol;
  document.getElementById('panel-bienvenida').textContent = usuario.nombre;
  document.getElementById('panel-contenido').classList.remove('d-none');

  document.querySelectorAll('.btn-logout').forEach(function (b) {
    b.addEventListener('click', cerrarSesion);
  });

  // Navegación lateral: muestra la sección elegida
  const enlaces = document.querySelectorAll('.panel-link[data-seccion]');
  const secciones = document.querySelectorAll('.panel-seccion');
  enlaces.forEach(function (enlace) {
    enlace.addEventListener('click', function (e) {
      e.preventDefault();
      enlaces.forEach(function (l) { l.classList.remove('activo'); });
      secciones.forEach(function (s) { s.classList.add('d-none'); });
      enlace.classList.add('activo');
      document.getElementById('seccion-' + enlace.dataset.seccion).classList.remove('d-none');
      document.getElementById('panel-sidebar').classList.remove('abierto');
    });
  });

  document.getElementById('panel-toggle').addEventListener('click', function () {
    document.getElementById('panel-sidebar').classList.toggle('abierto');
  });
});
