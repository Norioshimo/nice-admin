package com.niceadmin.controller;

import com.niceadmin.dto.filter.UsuariosFilter;
import com.niceadmin.dto.request.UsuarioChangePasswordRequest;
import com.niceadmin.dto.request.UsuarioRequest;
import com.niceadmin.dto.request.UsuarioUpdateRequest;
import com.niceadmin.dto.response.ApiResponse;
import com.niceadmin.entity.Usuario;
import com.niceadmin.mapper.UsuarioMapper;
import com.niceadmin.services.UsuarioService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/usuarios")
@Slf4j
public class UsuarioController {

    @Autowired
    private UsuarioMapper mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioService usuarioService;


    @GetMapping("/pagina")
    public ResponseEntity<?> listar(Pageable pageable, UsuariosFilter filter) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Lista de usuarios", usuarioService.findAll(pageable, filter)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> ver(@PathVariable(name = "id") Long id) {
        Optional<Usuario> optional = usuarioService.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(401, "Registro con el id " + id + " no encontado", null));
        } else {
            return ResponseEntity.ok().body(new ApiResponse<>(200, "Registro con el id " + id + " encontado", optional.get()));
        }
    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody UsuarioRequest request) {

        Usuario entity = mapper.toEntity(request);

        entity.setClave(passwordEncoder.encode(entity.getClave()));

        Usuario entityDb = usuarioService.save(entity);

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(200, "Registro creado con éxito", entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody UsuarioUpdateRequest request, @PathVariable(name = "id") Long id) {
        Optional<Usuario> optional = usuarioService.findById(id);

        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(401, "No existe el registro para editar ", null));
        }

        Usuario eDb = optional.get();

        if (request.getClave() != null) {
            request.setClave(passwordEncoder.encode(request.getClave()));
        } else {
            request.setClave(eDb.getClave());
        }

        mapper.updateEntityFromDto(request, eDb);


        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(200, "Registro actualizado con éxito", usuarioService.save(eDb))
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<Usuario> optional = usuarioService.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(404, "Registro con el id " + id + " no encontado para eliminar", null));
        } else {
            usuarioService.deleteById(id);
            return ResponseEntity.ok(new ApiResponse<>(200, "Registro con el id " + id + " Eliminado", null));
        }
    }

    @PostMapping("change-password")
    public ResponseEntity<?> actualizarClave(@Valid @RequestBody UsuarioChangePasswordRequest request) {
        Optional<Usuario> uDb = usuarioService.findById(request.getId());

        if (uDb.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(404, "No existe el usuario con el di " + request.getId(), null));
        }

        Usuario u = uDb.get();
        u.setClave(passwordEncoder.encode(request.getClave()));

        u = usuarioService.save(u);
        return ResponseEntity.ok(new ApiResponse<>(200, "Clave actualizado con éxito", u));
    }


}
