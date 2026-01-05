package com.niceadmin.controller;

import com.niceadmin.dto.filter.RolesFilter;
import com.niceadmin.dto.request.ProgramaRequest;
import com.niceadmin.dto.request.RolRequest;
import com.niceadmin.dto.response.ApiResponse;
import com.niceadmin.entity.Programa;
import com.niceadmin.entity.Rol;
import com.niceadmin.mapper.ProgramaMapper;
import com.niceadmin.mapper.RolMapper;
import com.niceadmin.services.RolService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
@Slf4j
public class RolController extends CommonController<Rol, RolService, RolRequest, RolesFilter>{


    @Autowired
    private RolMapper mapper;

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody RolRequest request, @PathVariable(name = "id") Long id) {
        Optional<Rol> optional = service.findById(id);

        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(401, "No existe el registro para editar ", null));
        }

        Rol eDb = optional.get();

        mapper.updateEntityFromDto(request, eDb);

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(200, "Registro actualizado con éxito", service.save(eDb)));
    }
}
