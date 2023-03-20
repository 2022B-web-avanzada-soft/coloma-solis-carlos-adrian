package com.adriancoloma.mascotas.controllers

import com.adriancoloma.mascotas.models.Mascota
import com.adriancoloma.mascotas.models.Persona
import com.adriancoloma.mascotas.services.MascotaService
import com.adriancoloma.mascotas.services.PersonaService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/persona")
class PersonaController(val service: PersonaService, val mascotaService: MascotaService) {
    @GetMapping
    fun obtenerPersonas() = service.encontrarPersonas()

    @PostMapping("/crear")
    fun crearPersona(@RequestBody persona: Persona) = service.guardarPersona(persona)

    @GetMapping("/{id}")
    fun obtenerPersona(@PathVariable id: Int) : ResponseEntity<Persona>{
        val persona = service.encontrarPersona(id)
        if(persona != null) {
            return ResponseEntity.ok(persona)
        } else {
            return ResponseEntity.notFound().build<Persona>()
        }
    }

    @PutMapping("/{id}")
    fun actualizarPersona(@PathVariable id: Int, @RequestBody persona: Persona) : ResponseEntity<String> {
        return if(service.actualizarPersona(id, persona)) {
            ResponseEntity.ok("Persona actualizada")
        } else {
            ResponseEntity.badRequest().body("No se ha encontrado la persona")
        }
    }
    @DeleteMapping("/{id}")
    fun eliminarPersona(@PathVariable id: Int) = service.eliminarPersona(id)
    fun error() = "Error"

    @GetMapping("/{idPersona}/mascotas")
    fun obtenerMascotasDePersona(@PathVariable idPersona: Int) : ResponseEntity<Set<Mascota>> {
        val persona = service.encontrarPersona(idPersona)
        if(persona != null) {
            return ResponseEntity.ok(persona.mascotas)
        } else {
            return ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/{idPersona}/mascotas/{idMascota}")
    fun obtenerMascotaDePersona(@PathVariable idPersona: Int, @PathVariable idMascota: Int) : ResponseEntity<Mascota> {
        val persona = service.encontrarPersona(idPersona)
        if(persona != null) {
            val mascota = mascotaService.encontrarMascota(idMascota)
            if(mascota != null) {
                return ResponseEntity.ok(mascota)
            } else {
                return ResponseEntity.notFound().build()
            }
        } else {
            return ResponseEntity.notFound().build()
        }
    }
    @PostMapping("/{idPersona}/mascotas/crear")
    fun crearMascota(@PathVariable idPersona: Int, @RequestBody mascota: Mascota) : ResponseEntity<String> {
        val persona = service.encontrarPersona(idPersona)
        if(persona != null) {
            val mascotas = persona.mascotas as MutableSet
            mascotas.add(mascota)
            service.guardarPersona(persona)
            return ResponseEntity.ok("Mascota creada")
        } else {
            return ResponseEntity.badRequest().body("No se ha encontrado la persona")
        }
    }

@DeleteMapping("/{idPersona}/mascotas/{idMascota}")
    fun eliminarMascota(@PathVariable idPersona: Int, @PathVariable idMascota: Int) : ResponseEntity<String> {
        val persona = service.encontrarPersona(idPersona)
        if(persona != null) {
            val mascota = mascotaService.encontrarMascota(idMascota)
            if(mascota != null) {
                val mascotas = persona.mascotas as MutableSet
                mascotas.remove(mascota)
                service.guardarPersona(persona)
                return ResponseEntity.ok("Mascota eliminada")
            } else {
                return ResponseEntity.badRequest().body("No se ha encontrado la mascota")
            }
        } else {
            return ResponseEntity.badRequest().body("No se ha encontrado la persona")
        }
    }

    @PutMapping("/{idPersona}/mascotas/{idMascota}")
    fun actualizarMascota(@PathVariable idPersona: Int, @PathVariable idMascota: Int, @RequestBody mascota: Mascota) : ResponseEntity<String> {
        val persona = service.encontrarPersona(idPersona)
        if(persona != null) {
            val mascotaActual = mascotaService.encontrarMascota(idMascota)
            if(mascotaActual != null) {
                mascotaActual.nombre = mascota.nombre
                mascotaActual.fechaNacimiento = mascota.fechaNacimiento
                mascotaActual.estaVacunado = mascota.estaVacunado
                mascotaService.guardarMascota(mascotaActual)
                return ResponseEntity.ok("Mascota actualizada")
            } else {
                return ResponseEntity.badRequest().body("No se ha encontrado la mascota")
            }
        } else {
            return ResponseEntity.badRequest().body("No se ha encontrado la persona")
        }
    }
}