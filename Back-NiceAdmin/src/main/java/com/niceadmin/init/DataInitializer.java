package com.niceadmin.init;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.niceadmin.entity.Rol;
import com.niceadmin.entity.Usuario;
import com.niceadmin.repository.RolRepository;
import com.niceadmin.repository.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.Date;

@Component
public class DataInitializer implements CommandLineRunner {


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
       /* // Crear rol por defecto si no existe
        Rol rolDefault = rolRepository.findById(1L).orElseGet(() -> {
            Rol rol = new Rol();
            rol.setNombre("ADMIN");
            return rolRepository.save(rol);
        });

        // Crear usuario por defecto si no existe
        usuarioRepository.findById(1L).orElseGet(() -> {
            Usuario usuario = new Usuario();
            usuario.setNombre("Adminitrador");
            usuario.setUsuario("admin");
            usuario.setEmail("admin@dominio.com");
            usuario.setClave(passwordEncoder.encode("123"));
            usuario.setRolId(rolDefault);
            return usuarioRepository.save(usuario);
        });*/
    }
}