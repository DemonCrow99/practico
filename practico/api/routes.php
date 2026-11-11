<?php
// api/routes.php

// ============================================================
// SECCIÓN: Autenticación
// ============================================================
$router->post('/login', 'AuthController@login');
$router->post('/logout', 'AuthController@logout');
$router->get('/me', 'AuthController@me');

// ============================================================
// SECCIÓN: Administración (protegida: solo rol Administrador)
// ============================================================
$router->get('/admin/resumen', 'AdminController@resumen');
