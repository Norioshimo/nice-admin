package com.niceadmin.controller;

import com.niceadmin.dto.request.LoginRequest;
import com.niceadmin.dto.response.ApiResponse;
import com.niceadmin.dto.response.LoginResponse;
import com.niceadmin.entity.Programa;
import com.niceadmin.entity.Usuario;
import com.niceadmin.security.jwt.JwtService;
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
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        Optional<Usuario> optional = usuarioService.buscarUsurios(request.getUsuario());

        if (optional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ApiResponse<>(401, "No existe el usuario", null)
            );
        }

        Usuario eDb = optional.get();

        if (!passwordEncoder.matches(request.getClave(), eDb.getClave())) {
            return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(401, "Clave Invalido", null));
        }


        String token = jwtService.generarToken(eDb);

        LoginResponse lr = LoginResponse.builder()
                .token(token)
                .build();


        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(200, "Bienvenido/a " + eDb.getNombre(), lr));
    }
}
