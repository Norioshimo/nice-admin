package com.niceadmin.specification;

import com.niceadmin.dto.filter.ProgramasFilter;
import com.niceadmin.entity.Programa;
import jakarta.persistence.criteria.Predicate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public class ProgramaSpecification{

    public static Specification<Programa> filtrar(ProgramasFilter f) {

        log.info("filtrar programas");
        return (root, query, cb) -> {
            log.info("Filtrar lista de programas?");

            log.info("Filtro datos programa: "+f.toString());
            List<Predicate> predicates = new ArrayList<>();

            if (f.getNombre() != null) {
                log.info("Fitlar por Nombre: "+f.getNombre());
                predicates.add(
                        cb.like(
                                cb.lower(root.get("nombre")),
                                "%" + f.getNombre().toLowerCase() + "%"
                        )
                );
            }
            if (f.getId() != null) {
                log.info("Fitlar por ID: "+f.getId());
                predicates.add(
                        cb.equal(
                                root.get("id"),f.getId()
                        )
                );
            }



            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
