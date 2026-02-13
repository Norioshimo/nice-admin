package com.niceadmin.controller;

import com.niceadmin.dto.filter.RolesFilter;
import com.niceadmin.dto.request.RolRequest;
import com.niceadmin.dto.response.ApiResponse;
import com.niceadmin.dto.response.RolResponse;
import com.niceadmin.entity.Rol;
import com.niceadmin.mapper.RolMapper;
import com.niceadmin.mapper.RolprogramaMapper;
import com.niceadmin.services.RolService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/roles")
@Slf4j
public class RolController {

    @Autowired
    private RolMapper mapper;
    @Autowired
    private RolprogramaMapper rolprogramaMapper;

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
            return ResponseEntity.ok(new ApiResponse<>(404, "Registro con el id " + id + " no encontado", null));
        }

        Rol rol = optional.get();

        RolResponse rr = armarRolResponse(rol);

        return ResponseEntity.ok().body(new ApiResponse<>(200, "Registro con el id " + id + " encontado", rr));

    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody RolRequest request) {
        log.info("Crear rol");
        /*try {
            Thread.sleep(5000); // pausa de 1 segundo (1000 milisegundos)
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/
        Rol rol = null;
        try {
            rol = this.rolService.crear(request);
        } catch (RuntimeException re) {
            re.printStackTrace();
            return ResponseEntity.ok(new ApiResponse<>(404, re.getMessage(), null));
        }

        RolResponse rr = armarRolResponse(rol);

        return ResponseEntity.ok(new ApiResponse<>(200, "Registro con el id creado con exito", rr));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody RolRequest request, @PathVariable(name = "id") Long id) {
        Rol rol = null;
        try {
            rol = this.rolService.editar(id, request);
        } catch (RuntimeException re) {
            re.printStackTrace();
            return ResponseEntity.ok(new ApiResponse<>(404, re.getMessage(), null));
        }

        RolResponse rr = armarRolResponse(rol);

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(200, "Registro actualizado con éxito", rr));
    }

    private RolResponse armarRolResponse(Rol rol) {
        RolResponse rr = mapper.toDto(rol);
        rr.setRolprogramaList(
                rol.getRolesprogramasList().stream().map(r -> {
                    return rolprogramaMapper.toDto(r);
                }).collect(Collectors.toList())
        );
        return rr;
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<Rol> optional = rolService.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(404, "Registro con el id " + id + " no encontado para eliminar", null));
        } else {
            rolService.deleteById(id);
            return ResponseEntity.ok(new ApiResponse<>(200, "Registro con el id " + id + " Eliminado", null));
        }
    }


}
