package com.niceadmin.services.imp;

import com.niceadmin.entity.Rolprograma;
import com.niceadmin.repository.RolprogramaRepository;
import com.niceadmin.services.RolprogramaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
public class RolprogramaServiceImp implements RolprogramaService {


    @Autowired
    private RolprogramaRepository repository;


    @Override
    public List<Rolprograma> findRolesprogramasByRol(Long rolid) {
        return repository.findRolesprogramasByRol(rolid);
    }

    @Override
    public Page<Rolprograma> findAll(Pageable pageable, Objects filter) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public Optional<Rolprograma> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Rolprograma save(Rolprograma entity) {
        return null;
    }
}
