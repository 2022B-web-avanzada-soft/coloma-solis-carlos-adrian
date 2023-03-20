CREATE TABLE IF NOT EXISTS persona(
                                      id INTEGER PRIMARY KEY AUTO_INCREMENT,
                                      nombre TEXT,
                                      fecha_nacimiento DATE,
                                      esta_casado BIT

);

CREATE TABLE IF NOT EXISTS mascota(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre TEXT,
    fecha_nacimiento DATE,
    esta_vacunado BIT,
    persona INTEGER,

    FOREIGN KEY (persona) REFERENCES persona(id)
);


