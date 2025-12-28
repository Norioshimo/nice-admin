package com.niceadmin.controller;

import com.niceadmin.dto.filter.ProgramasFilter;
import com.niceadmin.dto.request.ProgramaRequest;
import com.niceadmin.dto.response.ProgramaResponse;
import com.niceadmin.entity.Programa;
import com.niceadmin.mapper.ProgramaMapper;
import com.niceadmin.services.ProgramaService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/programas")
@Slf4j
public class ProgramaController extends CommonController<Programa> {

    @Autowired
    private ProgramaService service;

    @Autowired
    private ProgramaMapper mapper;

    @GetMapping("/pagina")
    public ResponseEntity<?> listar(Pageable pageable, ProgramasFilter filter) {
        log.info("Nombre recuperado: " + filter.getNombre());
        return ResponseEntity.ok(service.findAll(pageable, filter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> ver(@PathVariable(name = "id") Long id) {
        Optional<Programa> optional = service.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(optional.get());
        }
    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody ProgramaRequest programaRequest) {


        Programa entity = mapper.toEntity(programaRequest);

        ProgramaResponse programaResponse = mapper.toDto(service.save(entity));

        return ResponseEntity.status(HttpStatus.OK).body(programaResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody ProgramaRequest programaRequest, @PathVariable(name = "id") Long id) {
        log.info("Buscar programa con el id: " + id);

        Optional<Programa> optional = service.findById(id);

        if (optional.isEmpty()) {
            log.info("No existe el programa con el id: " + id);
            return ResponseEntity.notFound().build();
        }

        Programa programaDb = optional.get();

        mapper.updateEntityFromDto(programaRequest, programaDb);

        return ResponseEntity.status(HttpStatus.OK).body(mapper.toDto(service.save(programaDb)));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        service.deleteById(id);

        return ResponseEntity.ok().build();
    }


}
