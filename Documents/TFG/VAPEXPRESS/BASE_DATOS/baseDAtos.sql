CREATE DATABASE VAPEXPRESS;
\c VAPEXPRESS;
CREATE TABLE clientes (
    usuario VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL
);

-- Inserta 8 clientes de ejemplo con datos más realistas
INSERT INTO clientes (usuario, nombre, contrasena, apellidos, telefono, correo_electronico, fecha_nacimiento)
VALUES
    ('juanperez', 'Juan', 'claveSegura1', 'Perez', '555-123-4567', 'juan.perez@email.com', '1990-04-15'),
    ('mariagomez', 'Maria', 'contraseñaSegura2', 'Gomez', '555-987-6543', 'maria.gomez@email.com', '1985-08-20'),
    ('pedrolopez', 'Pedro', 'claveFuerte3', 'Lopez', '555-555-5555', 'pedro.lopez@email.com', '1987-12-05'),
    ('luciamartinez', 'Lucia', 'seguraPassword4', 'Martinez', '555-333-3333', 'lucia.martinez@email.com', '1993-06-30'),
    ('carlosrodriguez', 'Carlos', 'miClave5', 'Rodriguez', '555-444-4444', 'carlos.rodriguez@email.com', '1979-03-10'),
    ('lauragonzalez', 'Laura', 'contraseña123', 'Gonzalez', '555-888-8888', 'laura.gonzalez@email.com', '1982-01-25'),
    ('anafernandez', 'Ana', 'claveSegura678', 'Fernandez', '555-222-2222', 'ana.fernandez@email.com', '1996-09-18'),
    ('diegohernandez', 'Diego', 'passwordFuerte9', 'Hernandez', '555-666-6666', 'diego.hernandez@email.com', '1988-11-12');
