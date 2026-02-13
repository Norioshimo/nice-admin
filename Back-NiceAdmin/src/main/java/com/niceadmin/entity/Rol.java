package com.niceadmin.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "roles")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = {"id"})
public class Rol implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotNull
    @Size(max = 50)
    private String nombre;


    @Column(name = "create_at")
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    private Date createAt;

    @Column(name = "update_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateAt;


    @OneToMany(mappedBy = "rolId", cascade = CascadeType.ALL)
    //@JsonManagedReference //indica la parte “padre” que se serializa normalmente.
    @JsonIgnore
    private List<Usuario> usuarioList;


    @OneToMany(mappedBy = "rolId", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Rolprograma> rolesprogramasList = new ArrayList<>();

    @Column(name = "estado")
    @NotNull(message = "Estado es campo obligatorio")
    private boolean estado;

    @Column(name = "descripcion")
    @Size(max=2000)
    private String descripcion;

    @PrePersist
    public void prePersist() {
        this.createAt = new Date();
    }

    @PreUpdate
    public void preUpdate() {
        this.updateAt = new Date();
    }


    // Métodos de dominio
    public void agregarRolPrograma(Rolprograma detalle) {
        if (rolesprogramasList == null) {
            rolesprogramasList = new ArrayList<>();
        }
        rolesprogramasList.add(detalle);
        detalle.setRolId(this);
    }

    public void removerRolPrograma(Rolprograma detalle) {
        rolesprogramasList.remove(detalle);
        detalle.setRolId(null);
    }
}
