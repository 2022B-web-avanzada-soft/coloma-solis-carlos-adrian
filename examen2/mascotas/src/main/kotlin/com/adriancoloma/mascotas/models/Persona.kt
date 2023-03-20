package com.adriancoloma.mascotas.models

import com.fasterxml.jackson.annotation.JsonFormat
import jakarta.persistence.OneToMany
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDate
import org.springframework.data.annotation.Id
@Table(name = "persona")
data class Persona (
    @Id
    var id: Int? = null,
    var nombre: String? = null,
    @JsonFormat(pattern = "yyyy-MM-dd")
    var fechaNacimiento: LocalDate? = null,
    var estaCasado: Boolean? = null,

    @OneToMany(mappedBy = "dueno")
    var mascotas: Set<Mascota>? = null
)