package com.niceadmin.controller;

import com.niceadmin.dto.filter.RolesFilter;
import com.niceadmin.dto.request.RolRequest;
import com.niceadmin.dto.response.ApiResponse;
import com.niceadmin.dto.response.RolResponse;
import com.niceadmin.entity.Programa;
import com.niceadmin.entity.Rol;
import com.niceadmin.entity.Rolprograma;
import com.niceadmin.mapper.RolMapper;
import com.niceadmin.services.ProgramaService;
import com.niceadmin.services.RolService;
import com.niceadmin.services.RolprogramaService;
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
    private RolService rolService;
    @Autowired
    private RolprogramaService rolprogramaService;
    @Autowired
    private ProgramaService programaService;

    @GetMapping("/pagina")
    public ResponseEntity<?> listar(Pageable pageable, RolesFilter filter) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Lista de usuarios", rolService.findAll(pageable, filter)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> ver(@PathVariable(name = "id") Long id) {
        Optional<Rol> optional = rolService.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(401, "Registro con el id " + id + " no encontado", null));
        }

        Rol r = optional.get();
        List<Long> programaidList = r.getRolesprogramasList().stream().map(item -> item.getProgramaId().getId()).collect(Collectors.toList());

        RolResponse rr = mapper.toDto(optional.get());
        rr.setProgramasList(programaidList);

        return ResponseEntity.ok().body(new ApiResponse<>(200, "Registro con el id " + id + " encontado", rr));

    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody RolRequest request) {
        Rol entity = mapper.toEntity(request);

        String mensaje = sincronizarProgramas(entity,request.getProgramasList());

        if (!mensaje.isEmpty()) {// No existe algún programa recibido
            return ResponseEntity.ok(new ApiResponse<>(404, mensaje, null));
        }

        entity = rolService.save(entity);

        RolResponse rr = mapper.toDto(entity);
        rr.setProgramasList(entity.getRolesprogramasList().stream().map(item->item.getProgramaId().getId()).collect(Collectors.toList()));

        return ResponseEntity.ok(new ApiResponse<>(200, "Registro con el id creado con exito", rr));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody RolRequest request, @PathVariable(name = "id") Long id) {
        Optional<Rol> optional = rolService.findById(id);

        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(404, "No existe el registro " + id, null));
        }

        Rol eDb = optional.get();
        mapper.updateEntityFromDto(request, eDb);

        String mensaje = sincronizarProgramas(eDb,request.getProgramasList());

        if (!mensaje.isEmpty()) {// No existe algún programa recibido
            return ResponseEntity.ok(new ApiResponse<>(404, mensaje, null));
        }

        eDb = rolService.save(eDb);

        RolResponse rr = mapper.toDto(eDb);
        rr.setProgramasList(eDb.getRolesprogramasList().stream().map(item->item.getProgramaId().getId()).collect(Collectors.toList()));

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(200, "Registro actualizado con éxito", rr));
    }

    private String sincronizarProgramas(Rol rol, List<Long> programasRequest) {
        String mensaje="";
        if (rol.getRolesprogramasList() == null) {
            rol.setRolesprogramasList(new ArrayList<>());
        }

        // Si no envía programas → eliminar todos
        if (programasRequest == null || programasRequest.isEmpty()) {
            rol.getRolesprogramasList().clear(); // orphanRemoval = true
            return mensaje;
        }

        // Validar que todos los programas existan
        List<Programa> programasDB = programaService.findAllById(programasRequest);

        if (programasDB.size() != programasRequest.size()) {
            mensaje = "Uno o más programas no existen" ;
            return mensaje;
        }

        // IDs actuales en DB
        Set<Long> actuales = rol.getRolesprogramasList().stream()
                .map(rp -> rp.getProgramaId().getId())
                .collect(Collectors.toSet());

        // IDs enviados
        Set<Long> enviados = new HashSet<>(programasRequest);

        // Eliminar los que ya no vienen
        rol.getRolesprogramasList().removeIf(
                rp -> !enviados.contains(rp.getProgramaId().getId())
        );

        // Agregar los nuevos
        for (Programa programa : programasDB) {
            if (!actuales.contains(programa.getId())) {
                rol.getRolesprogramasList()
                        .add(
                                Rolprograma.builder()
                                        .rolId(rol)
                                        .programaId(programa)
                                        .build()
                        );
            }
        }
        return mensaje;
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
