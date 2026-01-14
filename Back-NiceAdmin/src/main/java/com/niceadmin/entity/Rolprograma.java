package com.niceadmin.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "rolesprogramas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = {"id"})
public class Rolprograma implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "can_create")
    private boolean canCreate;

    @Column(nullable = false, name = "can_update")
    private boolean canUpdate;

    @Column(nullable = false, name = "can_delete")
    private boolean canDelete;

    @Column(name = "create_at")
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull(message = "Create At es requerido")
    private Date createAt;

    @Column(name = "update_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updataAt;

    @JoinColumn(name = "rol_id", referencedColumnName = "id", nullable = false)// NOT NULL: En la base de datos.
    @ManyToOne(fetch = FetchType.LAZY, optional = false)// NOT NULL: a nivel de objeto
    @NotNull(message = "Rol es requerido")// NOT NULL: Validador de entrada.
    //@JsonBackReference //indica la parte “hija” que se ignora al serializar, evitando el bucle.
    private Rol rolId;

    @JoinColumn(name = "programa_id", referencedColumnName = "id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull(message = "Programa es requerido")
    //@JsonBackReference //indica la parte “hija” que se ignora al serializar, evitando el bucle.
    private Programa programaId;


    @PrePersist
    public void prePersist() {
        this.createAt = new Date();
    }

    @PreUpdate
    public void preUpdate() {
        this.updataAt = new Date();
    }


}
