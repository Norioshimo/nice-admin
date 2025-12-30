package com.niceadmin.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

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
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 100)
    private String nombre;

    @Size(max = 50)
    @NotNull
    private String usuario;

    @Size(max = 255)
    @NotNull
    @JsonIgnore
    private String clave;

    @Size(max = 150)
    private String email;


    @Column(name = "create_at")
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    private Date createAt;

    @Column(name = "update_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updataAt;


    @PrePersist
    public void prePersist() {
        this.createAt = new Date();
    }

    @PreUpdate
    public void preUpdate() {
        this.updataAt = new Date();
    }
}
