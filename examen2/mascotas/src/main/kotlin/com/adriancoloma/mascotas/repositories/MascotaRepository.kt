package com.adriancoloma.mascotas.repositories

import com.adriancoloma.mascotas.models.Mascota
import org.springframework.data.repository.CrudRepository

interface MascotaRepository : CrudRepository<Mascota, Int> {
}