package com.adriancoloma.mascotas.services

import com.adriancoloma.mascotas.models.Persona
import com.adriancoloma.mascotas.repositories.PersonaRepository
import org.springframework.stereotype.Service

@Service
class PersonaService(var db: PersonaRepository){
    fun encontrarPersonas(): List<Persona> = db.findAll().toList()
    fun encontrarPersona(id: Int): Persona? {
        try {
            return db.findById(id).get()
        } catch (e: NoSuchElementException) {
            return null
        }
    }
    fun guardarPersona(persona: Persona) = db.save(persona)

    fun eliminarPersona(id: Int) = db.deleteById(id)

    fun actualizarPersona(id: Int, persona: Persona) : Boolean = if(db.existsById(id)) {
        persona.id = id
        db.save(persona)
        true
    } else {
        false
    }

}

