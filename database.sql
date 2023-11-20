drop table PRUEBA;
drop table RETROALIMENTACION;
drop table USUARIO;

-- Crear la tabla de usuarios
CREATE TABLE USUARIO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    correo VARCHAR(255),
    contrasena VARCHAR(255)
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
  ID_Prueba INT PRIMARY KEY AUTO_INCREMENT,
  ID_Usuario INT,
  fecha_Hora TIMESTAMP,
  calificacion FLOAT,
  dificultad VARCHAR(50),
  tema VARCHAR(100),
  FOREIGN KEY (ID_Usuario) REFERENCES usuario(id)
);