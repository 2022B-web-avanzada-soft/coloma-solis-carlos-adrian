package com.adriancoloma.mascotas.services

import com.adriancoloma.mascotas.models.Mascota
import com.adriancoloma.mascotas.repositories.MascotaRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.toList

@Service
class MascotaService(val db: MascotaRepository) {
    fun encontrarMascotas(): List<Mascota> = db.findAll().toList()

    fun guardarMascota(mascota: Mascota) = db.save(mascota)
    fun encontrarMascota(id: Int): Mascota? = db.findById(id).get()
}