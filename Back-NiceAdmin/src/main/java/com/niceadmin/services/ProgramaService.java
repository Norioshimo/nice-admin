package com.niceadmin.services;

import com.niceadmin.dto.filter.ProgramasFilter;
import com.niceadmin.entity.Programa;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProgramaService extends CommonService<Programa, ProgramasFilter> {


    public List<Programa> findAllById(List<Long> ids);


    @Transactional(readOnly = true)
    public List<Programa>findAll();


    public Programa save(Programa entity);
}
