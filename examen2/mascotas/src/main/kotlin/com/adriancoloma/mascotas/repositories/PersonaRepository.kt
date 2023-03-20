package com.adriancoloma.mascotas.repositories

import com.adriancoloma.mascotas.models.Persona
import org.springframework.data.repository.CrudRepository

interface PersonaRepository : CrudRepository<Persona, Int>