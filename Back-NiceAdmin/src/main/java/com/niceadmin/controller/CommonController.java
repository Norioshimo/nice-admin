package com.niceadmin.controller;

import com.niceadmin.mapper.CommonMapper;
import com.niceadmin.services.CommonService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
//Entidad, EntidadService, EntidadRequest, EntidadFilter
public class CommonController<E, S extends CommonService<E, F>, R, F> {

    @Autowired
    protected S service;

    @Autowired
    protected CommonMapper<E, R> mapper;

    @GetMapping("/pagina")
    public ResponseEntity<?> listar(Pageable pageable, F filter) {
        return ResponseEntity.ok(service.findAll(pageable, filter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> ver(@PathVariable(name = "id") Long id) {
        Optional<E> optional = service.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(optional.get());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<E> optional = service.findById(id);
        if (optional.isEmpty()) {
            log.info("No existe id " + id);
            return ResponseEntity.notFound().build();
        } else {
            service.deleteById(id);
            return ResponseEntity.ok().body(optional.get());
        }
    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody R request) {

        E entity = mapper.toEntity(request);

        E entityDb = service.save(entity);

        return ResponseEntity.status(HttpStatus.OK).body(entityDb);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody R request, @PathVariable(name = "id") Long id) {
        Optional<E> optional = service.findById(id);

        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        E eDb = optional.get();

        mapper.updateEntityFromDto(request, eDb);

        return ResponseEntity.status(HttpStatus.OK).body(service.save(eDb));
    }

    /*
    Es practico para algo muy personalizado.
    Para user, se debe activar el Binding Eje: @Valid @RequestBody Programa programa, BindingResult result
    Y luego capturar el error.
    if (result.hasErrors()) {
            log.info("Datos de programa invalidos");
            return this.validar(result);
        }
    */
    /*protected ResponseEntity<?> validar(BindingResult result) {
        Map<String, Object> errores = new HashMap<>();

        result.getFieldErrors().forEach(err -> {
            errores.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });

        return ResponseEntity.badRequest().body(errores);
    }
    */

}
