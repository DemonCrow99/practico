<?php
namespace App\Models\Auth;
use PDO;

class AuthModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    /**
     * Busca un usuario por su nombre y trae el nombre de su rol.
     * Devuelve el registro o false si no existe.
     */
    public function buscarPorNombre($nombre) {
        $sql = "SELECT u.id_usuario, u.nombre, u.password_hash, r.nombre AS rol
                FROM usuarios u
                INNER JOIN roles r ON r.id_rol = u.id_rol
                WHERE u.nombre = :nombre
                LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':nombre' => $nombre]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
