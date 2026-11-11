-- ============================================================
-- Biblioteca Virtual ARCA - Base de datos
-- Pasaje a tablas del MER (Usuarios, Roles, Libros)
-- ============================================================
CREATE DATABASE IF NOT EXISTS biblioteca_arca
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE biblioteca_arca;

DROP TABLE IF EXISTS libros;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS roles;

-- Roles (relación Tienen: 1 rol -> n usuarios)
CREATE TABLE roles (
  id_rol  INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre  VARCHAR(30)  NOT NULL,
  PRIMARY KEY (id_rol),
  UNIQUE KEY uq_roles_nombre (nombre)
) ENGINE=InnoDB;

-- Usuarios (FK id_rol hacia roles). password_hash se agrega para el login.
CREATE TABLE usuarios (
  id_usuario    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre        VARCHAR(60)  NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  id_rol        INT UNSIGNED NOT NULL,
  PRIMARY KEY (id_usuario),
  UNIQUE KEY uq_usuarios_nombre (nombre),
  CONSTRAINT fk_usuarios_roles FOREIGN KEY (id_rol) REFERENCES roles (id_rol)
) ENGINE=InnoDB;

-- Libros (relación tienen: 1 usuario -> n libros)
CREATE TABLE libros (
  id_libro   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre     VARCHAR(150) NOT NULL,
  autor      VARCHAR(100) NOT NULL,
  tipo       VARCHAR(30)  NOT NULL,
  editorial  VARCHAR(100) NULL,
  genero     VARCHAR(60)  NULL,
  id_usuario INT UNSIGNED NOT NULL,
  PRIMARY KEY (id_libro),
  CONSTRAINT fk_libros_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
) ENGINE=InnoDB;

-- Datos iniciales
INSERT INTO roles (nombre) VALUES ('Administrador'), ('Comprador');

-- Contraseñas de prueba (guardadas con password_hash de PHP):
--   admin   -> Admin123
--   usuario -> Usuario123  (rol Comprador)
INSERT INTO usuarios (nombre, password_hash, id_rol) VALUES
  ('admin',   '$2y$10$VB02o69A12vAp5zNAshaH.QMar/jT7Xt9VQtvYvsbeQ11Jfe4DRI2', (SELECT id_rol FROM roles WHERE nombre = 'Administrador')),
  ('usuario', '$2y$10$CTOT9CtFZT6PrVCgNVVf2exBidXBVoTEzkGOtP2cWVghdwZAvBS8.', (SELECT id_rol FROM roles WHERE nombre = 'Comprador'));
