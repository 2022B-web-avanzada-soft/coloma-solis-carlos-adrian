package com.adriancoloma.mascotas.models
import com.fasterxml.jackson.annotation.JsonFormat
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDate


@Table(name = "mascota")
data class Mascota (
    @Id
    var id: Int? = null,
    var nombre: String? = null,
    @JsonFormat(pattern = "yyyy-MM-dd")
    var fechaNacimiento: LocalDate? = null,
    var estaVacunado: Boolean? = null,

)