package com.niceadmin.services.imp;

import com.niceadmin.dto.filter.RolesFilter;
import com.niceadmin.dto.request.RolRequest;
import com.niceadmin.dto.request.RolprogramaRequest;
import com.niceadmin.entity.Programa;
import com.niceadmin.entity.Rol;
import com.niceadmin.entity.Rolprograma;
import com.niceadmin.mapper.RolMapper;
import com.niceadmin.mapper.RolprogramaMapper;
import com.niceadmin.repository.ProgramaRepository;
import com.niceadmin.repository.RolRepository;
import com.niceadmin.services.RolService;
import com.niceadmin.specification.RolSpecification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class RolServiceImp implements RolService {

    @Autowired
    private RolprogramaMapper rolprogramaMapper;
    @Autowired
    private RolMapper rolMapper;

    @Autowired
    private RolRepository rolRepository;
    @Autowired
    private ProgramaRepository programaRepository;


    @Transactional
    @Override
    public Rol crear(RolRequest rolRequest) {
        // Datos de la cabecera...
        Rol rol = crearEditar(null, rolRequest);

        return rolRepository.save(rol);
    }

    @Transactional
    @Override
    public Rol editar(Long id, RolRequest rolRequest) {
        Rol rol = crearEditar(id, rolRequest);

        return rolRepository.save(rol);
    }

    private Rol crearEditar(Long id, RolRequest rolRequest) {
        log.info("ID rol: " + id);
        Rol rol = null;
        // Datos de la cabecera...
        if (id != null) {// Si no es null
            rol = rolRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("No existe el rol con el id " + id));
            rolMapper.updateEntityFromDto(rolRequest, rol);

        } else {// Rol Nuevo
            rol = Rol.builder()
                    .nombre(rolRequest.getNombre())
                    .build();
        }


        if (rolRequest.getRolprogramaList() == null) {// Si recibí vacio. Se elimina todo en la base de datos.
            rol.getRolesprogramasList().clear();
        } else {
            // Recorrer los detalles entrantes
            List<Rolprograma> nuevo = new ArrayList<>();
            for (RolprogramaRequest dto : rolRequest.getRolprogramaList()) {
                if (dto.getId() != null) {// Editar
                    // 1️⃣ Validar que el detalle existe
                    Rolprograma rolprogramaExistente = rol.getRolesprogramasList().stream()
                            .filter(d -> {
                                log.info(d.getId() + "");
                                log.info(dto.getId() + "");
                                return d.getId().equals(dto.getId());
                            })
                            .findFirst()
                            .orElseThrow(() -> new RuntimeException("rolprograma con id " + dto.getId() + " no pertenece existe en el rol"));

                    rolprogramaMapper.updateEntityFromDto(dto, rolprogramaExistente);
                } else {// Nuevo
                    // Buscar programa en la base de datos...
                    Programa programa = programaRepository.findById(dto.getProgramaId())
                            .orElseThrow(() -> new RuntimeException("No existe el programa con el ID " + dto.getProgramaId()));

                    Rolprograma rolprograma = rolprogramaMapper.toEntity(dto);

                    nuevo.add(rolprograma);

                }
            }

            // Agregar los rolprogramas nuevos..
            for (Rolprograma rolprograma : nuevo) {
                rol.agregarRolPrograma(rolprograma);
            }
        }

        // 4️⃣ Eliminar detalles que no están en la request
        Set<Long> idsRequest = rolRequest.getRolprogramaList().stream()
                .filter(d -> d.getId() != null)
                .map(RolprogramaRequest::getId)
                .collect(Collectors.toSet());

        rol.getRolesprogramasList().removeIf(detalle -> detalle.getId() != null && !idsRequest.contains(detalle.getId()));

        return rol;
    }


    @Override
    public Page<Rol> findAll(Pageable pageable, RolesFilter filter) {
        log.info("Recuperar lista de programas.");
        Specification<Rol> spec = RolSpecification.filtrar(filter);
        return rolRepository.findAll(spec, pageable);
    }


    @Override
    public Optional<Rol> findById(Long id) {
        return rolRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        rolRepository.deleteById(id);
    }

}
