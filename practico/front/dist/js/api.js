// Configuración común para llamar a la API y redirigir según el rol
(function () {
  // Si el front está en .../front/..., la API está en .../api
  const idx = location.pathname.indexOf('/front/');
  const base = idx !== -1 ? location.pathname.slice(0, idx) : '';
  const raizFront = idx !== -1 ? base + '/front' : '';

  window.API_URL = base + '/api';

  // Rutas del front (relativas a la raíz del front)
  window.RUTAS = {
    inicio:    raizFront + '/index.html',
    login:     raizFront + '/dist/pages/login.html',
    dashboard: raizFront + '/dist/pages/dashboard.html',
    usuario:   raizFront + '/dist/pages/usuario.html'
  };

  window.esAdministrador = function (usuario) {
    return !!usuario && String(usuario.rol).toLowerCase() === 'administrador';
  };

  // Devuelve a qué página corresponde cada rol
  window.rutaSegunRol = function (usuario) {
    return window.esAdministrador(usuario) ? window.RUTAS.dashboard : window.RUTAS.usuario;
  };

  window.apiFetch = async function (ruta, opciones) {
    const config = Object.assign({ credentials: 'same-origin' }, opciones || {});
    if (config.body && typeof config.body !== 'string') {
      config.headers = Object.assign({ 'Content-Type': 'application/json' }, config.headers);
      config.body = JSON.stringify(config.body);
    }
    const respuesta = await fetch(window.API_URL + ruta, config);
    let datos = {};
    try { datos = await respuesta.json(); } catch (e) {}
    return { ok: respuesta.ok, estado: respuesta.status, datos: datos };
  };

  window.cerrarSesion = async function () {
    await window.apiFetch('/logout', { method: 'POST' });
    window.location.href = window.RUTAS.login;
  };
})();
