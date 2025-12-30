package com.niceadmin.controller;

import com.niceadmin.dto.filter.UsuariosFilter;
import com.niceadmin.dto.request.UsuarioRequest;
import com.niceadmin.entity.Usuario;
import com.niceadmin.services.UsuarioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/usuarios")
@Slf4j
public class UsuarioController extends CommonController<Usuario, UsuarioService, UsuarioRequest, UsuariosFilter> {




}
