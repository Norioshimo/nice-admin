package com.niceadmin.repository;

import com.niceadmin.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long>, JpaSpecificationExecutor<Usuario> {

    @Query("SELECT u FROM Usuario u WHERE u.usuario=:usuario")
    public Optional<Usuario>buscarUsurios(@Param("usuario") String usuario);
}
