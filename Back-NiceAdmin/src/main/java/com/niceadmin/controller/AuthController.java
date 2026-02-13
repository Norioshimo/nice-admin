package com.niceadmin.controller;

import com.niceadmin.dto.request.LoginRequest;
import com.niceadmin.dto.response.ApiResponse;
import com.niceadmin.dto.response.LoginResponse;
import com.niceadmin.entity.Usuario;
import com.niceadmin.security.jwt.JwtService;
import com.niceadmin.services.UsuarioService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
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
                    new ApiResponse<>(404, "No existe el usuario", null)
            );
        }

        Usuario eDb = optional.get();

        if (!passwordEncoder.matches(request.getClave(), eDb.getClave())) {
            return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(401, "Clave Invalido", null));
        }

        String token = jwtService.generarToken(eDb);

        LoginResponse lr = LoginResponse.builder()
                .token(token)
                .id(eDb.getId())
                .usuario(eDb.getUsuario())
                .nombre(eDb.getNombre())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(200, "Bienvenido/a " + eDb.getNombre(), lr));
    }


    @GetMapping("check-status")
    public ResponseEntity<?>checkStatus(@RequestHeader("Authorization") String authHeader){
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.info("No hay token en el header");
            return ResponseEntity.status(401).body("Token faltante o inválido");
        }

        /*try {
            Thread.sleep(5000); // pausa de 1 segundo (1000 milisegundos)
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/
        String token = authHeader.substring(7); // quitar "Bearer "

        Long userid=jwtService.extrarUserId(token);

        Optional<Usuario>uDB=this.usuarioService.findById(userid);
        if(uDB.isEmpty()){//Si no existe el usuario con el id del token
            log.info("Token invalido para el usuario generado");
            return ResponseEntity.status(401).body("Token invalido para el usuario generado");
        }

        Usuario usuario =uDB.get();

        String tokenNew = jwtService.generarToken(usuario);

        LoginResponse lr = LoginResponse.builder()
                .token(tokenNew)
                .id(usuario.getId())
                .usuario(usuario.getUsuario())
                .nombre(usuario.getNombre())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(200, "Token renovado"  , lr));

    }

   }
