drop table PRUEBA;
drop table RETROALIMENTACION;
drop table USUARIO;

-- Crear la tabla de usuarios
CREATE TABLE USUARIO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    correo VARCHAR(255),
    contrasena VARCHAR(255)
);

-- Crear la tabla de retroalimentación de consultas
CREATE TABLE RETROALIMENTACION (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    consulta TEXT,
    retroalimentacion TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Crear tabla Pruebas
CREATE TABLE PRUEBA (
  ID_Prueba INT PRIMARY KEY AUTO_INCREMENT,
  ID_Usuario INT,
  Fecha_Hora TIMESTAMP,
  Calificacion FLOAT,
  Dificultad VARCHAR(50),
  Tema VARCHAR(100),
  FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario)
);