package com.niceadmin.services;

import com.niceadmin.entity.Rolprograma;

import java.util.List;
import java.util.Objects;

public interface RolprogramaService extends CommonService<Rolprograma, Objects>{

    public List<Rolprograma> findRolesprogramasByRol(Long rolid);
}
