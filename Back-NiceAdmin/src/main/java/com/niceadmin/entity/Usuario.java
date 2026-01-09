package com.niceadmin.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString()
@EqualsAndHashCode(of = {"id"})
public class Usuario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 100)
    private String nombre;

    @Size(max = 50)
    @NotNull(message = "Usuario es requerido")
    private String usuario;

    @Size(max = 255)
    @NotNull(message = "Clave es requerido")
    @JsonIgnore
    private String clave;

    @Size(max = 150)
    private String email;


    @Column(name = "create_at")
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull(message = "Create At es requerido")
    private Date createAt;

    @Column(name = "update_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updataAt;

    @JoinColumn(name = "rol_id",referencedColumnName = "id")
    @ManyToOne(optional = false)
    @NotNull(message = "Rol es requerido")
    @JsonBackReference //indica la parte “hija” que se ignora al serializar, evitando el bucle.
    private Rol rolId;


    @PrePersist
    public void prePersist() {
        this.createAt = new Date();
    }

    @PreUpdate
    public void preUpdate() {
        this.updataAt = new Date();
    }
}
