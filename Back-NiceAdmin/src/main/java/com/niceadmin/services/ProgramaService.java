package com.niceadmin.services;

import com.niceadmin.dto.filter.ProgramasFilter;
import com.niceadmin.entity.Programa;

import java.util.List;

public interface ProgramaService extends CommonService<Programa, ProgramasFilter> {


    public List<Programa> findAllById(List<Long> ids);

    public Programa save(Programa entity);
}
