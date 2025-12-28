package com.niceadmin.services;

import com.niceadmin.dto.filter.ProgramasFilter;
import com.niceadmin.dto.request.ProgramaRequest;
import com.niceadmin.dto.response.ProgramaResponse;
import com.niceadmin.entity.Programa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ProgramaService {

    Page<Programa> findAll( Pageable pageable ,ProgramasFilter filter );

    @Transactional
    public Programa save(Programa entity);


    @Transactional(readOnly = true)
    public Optional<Programa> findById(Long id);

    @Transactional
    public void deleteById(Long id);
}
