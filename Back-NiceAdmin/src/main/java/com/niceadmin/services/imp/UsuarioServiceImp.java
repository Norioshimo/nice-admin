package com.niceadmin.services.imp;

import com.niceadmin.dto.filter.UsuariosFilter;
import com.niceadmin.entity.Usuario;
import com.niceadmin.repository.UsuarioRepository;
import com.niceadmin.services.UsuarioService;
import com.niceadmin.specification.UsuarioSpecification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UsuarioServiceImp implements UsuarioService {

    @Autowired
    private UsuarioRepository repository;


    @Override
    public Page<Usuario> findAll(Pageable pageable, UsuariosFilter filter) {
        log.info("Recuperar lista de usuarios.");
        Specification<Usuario> spec = UsuarioSpecification.filtrar(filter);
        return repository.findAll(spec, pageable);
    }

    @Override
    public Usuario save(Usuario entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<Usuario> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Usuario>buscarUsurios(String usuario){
        return repository.buscarUsurios(usuario);
    }
}
