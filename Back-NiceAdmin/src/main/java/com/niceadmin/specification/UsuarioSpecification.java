package com.niceadmin.specification;

import com.niceadmin.dto.filter.UsuariosFilter;
import com.niceadmin.entity.Usuario;
import jakarta.persistence.criteria.Predicate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public class UsuarioSpecification {

    public static Specification<Usuario> filtrar(UsuariosFilter f) {
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
