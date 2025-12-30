package com.niceadmin.services;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

// Entidad, EntidadFilter
public interface CommonService<E,F> {

    @Transactional(readOnly = true)
    public Page<E> findAll(Pageable pageable , F filter);

    @Transactional
    public void deleteById(Long id);


    @Transactional(readOnly = true)
    public Optional<E> findById(Long id);

    @Transactional
    public E save(E entity);


}
