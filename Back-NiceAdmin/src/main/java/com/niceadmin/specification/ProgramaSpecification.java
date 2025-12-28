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
        return (root, query, cb) -> {

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



            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
