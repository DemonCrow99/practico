<?php
namespace App\Controllers;

use App\Models\Auth\AuthModel;

class AuthController {
    private $db;
    private $model;

    public function __construct($db) {
        $this->db = $db;
        $this->model = new AuthModel($db);
    }

    private function iniciarSesion() {
        \App\Utils\Sesion::iniciar();
    }

    private function responder($codigo, $datos) {
        http_response_code($codigo);
        echo json_encode($datos);
    }

    // POST /login  { "nombre": "...", "password": "..." }
    public function login() {
        $entrada  = json_decode(file_get_contents('php://input'), true) ?: [];
        $nombre   = trim($entrada['nombre'] ?? '');
        $password = $entrada['password'] ?? '';

        if ($nombre === '' || $password === '') {
            return $this->responder(400, [
                'status'  => 'error',
                'message' => 'Ingresá tu usuario y contraseña'
            ]);
        }

        $usuario = $this->model->buscarPorNombre($nombre);

        // Mismo mensaje si falla el usuario o la contraseña (no se revela cuál)
        if (!$usuario || !password_verify($password, $usuario['password_hash'])) {
            return $this->responder(401, [
                'status'  => 'error',
                'message' => 'Usuario o contraseña incorrectos'
            ]);
        }

        $this->iniciarSesion();
        session_regenerate_id(true);
        $_SESSION['usuario'] = [
            'id'     => (int) $usuario['id_usuario'],
            'nombre' => $usuario['nombre'],
            'rol'    => $usuario['rol']
        ];

        return $this->responder(200, [
            'status'  => 'success',
            'message' => 'Sesión iniciada',
            'usuario' => $_SESSION['usuario']
        ]);
    }

    // GET /me  -> devuelve el usuario de la sesión (o 401)
    public function me() {
        $this->iniciarSesion();
        if (empty($_SESSION['usuario'])) {
            return $this->responder(401, [
                'status'  => 'error',
                'message' => 'No hay sesión iniciada'
            ]);
        }
        return $this->responder(200, [
            'status'  => 'success',
            'usuario' => $_SESSION['usuario']
        ]);
    }

    // POST /logout
    public function logout() {
        $this->iniciarSesion();
        $_SESSION = [];
        session_destroy();
        return $this->responder(200, [
            'status'  => 'success',
            'message' => 'Sesión cerrada'
        ]);
    }
}
