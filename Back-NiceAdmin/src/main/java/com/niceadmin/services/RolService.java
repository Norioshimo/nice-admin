package com.niceadmin.services;

import com.niceadmin.dto.filter.RolesFilter;
import com.niceadmin.dto.request.RolRequest;
import com.niceadmin.entity.Rol;

public interface RolService extends CommonService<Rol, RolesFilter> {

    public Rol crear(RolRequest rolRequest);

    public Rol editar(Long id, RolRequest rolRequest);
}
