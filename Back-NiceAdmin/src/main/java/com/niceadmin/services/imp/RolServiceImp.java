package com.niceadmin.services.imp;

import com.niceadmin.dto.filter.RolesFilter;
import com.niceadmin.entity.Rol;
import com.niceadmin.repository.RolRepository;
import com.niceadmin.services.RolService;
import com.niceadmin.specification.RolSpecification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
public class RolServiceImp implements RolService {


    @Autowired
    private RolRepository repository;

    @Override
    public Page<Rol> findAll(Pageable pageable, RolesFilter filter) {
        log.info("Recuperar lista de programas.");
        Specification<Rol> spec = RolSpecification.filtrar(filter);
        return repository.findAll(spec, pageable);
    }

    @Transactional
    public Rol save(Rol entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<Rol> findById(Long id) {
        return repository.findById(id);
    }


    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

}
