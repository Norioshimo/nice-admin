package com.niceadmin.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

@Slf4j
public class CommonController<E> {


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
