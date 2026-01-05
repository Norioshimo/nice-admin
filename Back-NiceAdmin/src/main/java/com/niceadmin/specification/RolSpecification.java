package com.niceadmin.specification;

import com.niceadmin.dto.filter.RolesFilter;
import com.niceadmin.entity.Rol;
import jakarta.persistence.criteria.Predicate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public class RolSpecification {

    public static Specification<Rol> filtrar(RolesFilter f) {
        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (f.getNombre() != null) {
                log.info("Fitlar por Nombre: " + f.getNombre());
                predicates.add(
                        cb.like(
                                cb.lower(root.get("nombre")),
                                "%" + f.getNombre().toLowerCase() + "%"
                        )
                );
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
