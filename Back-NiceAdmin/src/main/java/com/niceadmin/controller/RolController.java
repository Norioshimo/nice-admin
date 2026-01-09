package com.niceadmin.controller;

import com.niceadmin.dto.filter.RolesFilter;
import com.niceadmin.dto.request.RolRequest;
import com.niceadmin.dto.response.ApiResponse;
import com.niceadmin.entity.Rol;
import com.niceadmin.mapper.RolMapper;
import com.niceadmin.services.RolService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
@Slf4j
public class RolController {

    @Autowired
    private RolMapper mapper;
    @Autowired
    private RolService rolService;

    @GetMapping("/pagina")
    public ResponseEntity<?> listar(Pageable pageable, RolesFilter filter) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Lista de usuarios", rolService.findAll(pageable, filter)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> ver(@PathVariable(name = "id") Long id) {
        Optional<Rol> optional = rolService.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(401, "Registro con el id " + id + " no encontado", null));
        } else {
            return ResponseEntity.ok().body(new ApiResponse<>(200, "Registro con el id " + id + " encontado", optional.get()));
        }
    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody RolRequest request) {
        Rol entity = mapper.toEntity(request);
        entity = rolService.save(entity);
        return ResponseEntity.ok(new ApiResponse<>(200, "Registro con el id creado con exito", entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody RolRequest request, @PathVariable(name = "id") Long id) {
        Optional<Rol> optional = rolService.findById(id);

        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(401, "No existe el registro para editar ", null));
        }

        Rol eDb = optional.get();

        mapper.updateEntityFromDto(request, eDb);

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(200, "Registro actualizado con éxito", rolService.save(eDb)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<Rol> optional = rolService.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(401, "Registro con el id " + id + " no encontado para eliminar", null));
        } else {
            rolService.deleteById(id);
            return ResponseEntity.ok(new ApiResponse<>(200, "Registro con el id " + id + " Eliminado", null));
        }
    }


}
