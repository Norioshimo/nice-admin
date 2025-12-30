package com.niceadmin.controller;

import com.niceadmin.dto.filter.ProgramasFilter;
import com.niceadmin.dto.request.ProgramaRequest;
import com.niceadmin.entity.Programa;
import com.niceadmin.services.ProgramaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/programas")
@Slf4j
public class ProgramaController extends CommonController<Programa,ProgramaService,ProgramaRequest,ProgramasFilter> {






}
