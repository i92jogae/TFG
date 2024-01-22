-- Borrar la base de datos si existe previamente
DROP DATABASE IF EXISTS dblearning;

-- Crear la base de datos dblearning
CREATE DATABASE IF NOT EXISTS dblearning;
USE dblearning;

-- Crear la tabla de usuarios
CREATE TABLE USUARIO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    correo VARCHAR(255),
    contrasena VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol VARCHAR(50) DEFAULT 'Usuario Generico'
);

-- Crear la tabla de retroalimentación de consultas
CREATE TABLE RETROALIMENTACION (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    consulta TEXT,
    respuesta TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- Crear tabla Pruebas
CREATE TABLE PRUEBA (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  calificacion FLOAT,
  dificultad VARCHAR(50),
  temas TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);