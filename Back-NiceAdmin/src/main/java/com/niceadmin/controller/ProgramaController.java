package com.niceadmin.controller;

import com.niceadmin.dto.filter.ProgramasFilter;
import com.niceadmin.dto.request.ProgramaRequest;
import com.niceadmin.dto.response.ApiResponse;
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
public class ProgramaController {

    @Autowired
    private ProgramaMapper mapper;
    @Autowired
    private ProgramaService programaService;

    @GetMapping("/pagina")
    public ResponseEntity<?> listar(Pageable pageable, ProgramasFilter filter) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Lista de usuarios", programaService.findAll(pageable, filter)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> ver(@PathVariable(name = "id") Long id) {
        Optional<Programa> optional = programaService.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(401, "Registro con el id " + id + " no encontado", null));
        } else {
            return ResponseEntity.ok().body(new ApiResponse<>(200, "Registro con el id " + id + " encontado", optional.get()));
        }
    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody ProgramaRequest request) {
        Programa entity = mapper.toEntity(request);
        entity = programaService.save(entity);

        return ResponseEntity.ok(new ApiResponse<>(200, "Registro con el id creado con exito", entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody ProgramaRequest request, @PathVariable(name = "id") Long id) {
        Optional<Programa> optional = programaService.findById(id);

        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(401, "No existe el registro para editar ", null));
        }

        Programa eDb = optional.get();

        mapper.updateEntityFromDto(request, eDb);

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(200, "Registro actualizado con éxito", programaService.save(eDb)));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<Programa> optional = programaService.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(401, "Registro con el id " + id + " no encontado para eliminar", null));
        } else {
            programaService.deleteById(id);
            return ResponseEntity.ok(new ApiResponse<>(200, "Registro con el id " + id + " Eliminado", null));
        }
    }


}
