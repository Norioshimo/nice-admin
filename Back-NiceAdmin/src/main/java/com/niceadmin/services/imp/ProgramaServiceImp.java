package com.niceadmin.services.imp;

import com.niceadmin.dto.filter.ProgramasFilter;
import com.niceadmin.entity.Programa;
import com.niceadmin.repository.ProgramaRepository;
import com.niceadmin.services.ProgramaService;
import com.niceadmin.specification.ProgramaSpecification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ProgramaServiceImp implements ProgramaService {

    @Autowired
    private ProgramaRepository repository;


    @Override
    public Page<Programa> findAll(Pageable pageable, ProgramasFilter filter) {
        log.info("Recuperar lista de programas.");
        Specification<Programa> spec = ProgramaSpecification.filtrar(filter);
        return repository.findAll(spec, pageable);
    }

    @Override
    public List<Programa> findAll() {
        return repository.findAll();
    }


    @Transactional
    public Programa save(Programa entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<Programa> findById(Long id) {
        return repository.findById(id);
    }


    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<Programa> findAllById(List<Long> ids) {
        return repository.findAllById(ids);
    }


}
