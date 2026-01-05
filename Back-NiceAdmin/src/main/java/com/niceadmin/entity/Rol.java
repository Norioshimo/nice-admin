package com.niceadmin.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "roles")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString()
@EqualsAndHashCode(of = {"id"})
public class Rol {


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


    @PrePersist
    public void prePersist() {
        this.createAt = new Date();
    }

    @PreUpdate
    public void preUpdate() {
        this.updateAt = new Date();
    }

}
