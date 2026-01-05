package com.niceadmin.services;

import com.niceadmin.dto.filter.UsuariosFilter;
import com.niceadmin.entity.Usuario;

import java.util.Optional;

public interface UsuarioService extends CommonService<Usuario, UsuariosFilter>{


    public Optional<Usuario>buscarUsurios(String usuario);

}
