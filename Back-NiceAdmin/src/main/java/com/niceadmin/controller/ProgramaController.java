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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/programas")
@Slf4j
public class ProgramaController extends CommonController<Programa, ProgramaService, ProgramaRequest, ProgramasFilter> {

    @Autowired
    private ProgramaMapper mapper;

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody ProgramaRequest request, @PathVariable(name = "id") Long id) {
        Optional<Programa> optional = service.findById(id);

        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(401, "No existe el registro para editar ", null));
        }

        Programa eDb = optional.get();

        mapper.updateEntityFromDto(request, eDb);

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(200, "Registro actualizado con éxito", service.save(eDb)));
    }
}
