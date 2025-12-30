package com.niceadmin.controller;

import com.niceadmin.dto.filter.UsuariosFilter;
import com.niceadmin.dto.request.UsuarioRequest;
import com.niceadmin.dto.request.UsuarioUpdateRequest;
import com.niceadmin.entity.Usuario;
import com.niceadmin.mapper.UsuarioMapper;
import com.niceadmin.services.UsuarioService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/usuarios")
@Slf4j
public class UsuarioController extends CommonController<Usuario, UsuarioService, UsuarioRequest, UsuariosFilter> {



    @Autowired
    private UsuarioMapper mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public ResponseEntity<?> crear(@Valid @RequestBody UsuarioRequest request) {

        Usuario entity = mapper.toEntity(request);

        entity.setClave(passwordEncoder.encode(entity.getClave()));

        Usuario entityDb = service.save(entity);

        return ResponseEntity.status(HttpStatus.OK).body(entityDb);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody UsuarioUpdateRequest request, @PathVariable(name = "id") Long id) {
        Optional<Usuario> optional = service.findById(id);

        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Usuario eDb = optional.get();

        if (request.getClave() != null) {
            request.setClave(passwordEncoder.encode(request.getClave()));
        }else{
            request.setClave(eDb.getClave());
        }

        mapper.updateEntityFromDto(request, eDb);

        return ResponseEntity.status(HttpStatus.OK).body(service.save(eDb));
    }


}
