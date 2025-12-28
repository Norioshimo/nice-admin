package com.niceadmin.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "programas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString()
@EqualsAndHashCode(of = {"id"})
public class Programa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotNull
    private String nombre;


    @Column(name = "create_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createAt;


    @PrePersist
    public void prePersist() {
        this.createAt = new Date();
    }


}
