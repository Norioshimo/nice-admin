package com.niceadmin.repository;

import com.niceadmin.entity.Rolprograma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RolprogramaRepository extends JpaRepository<Rolprograma, Long> {

    @Query("SELECT r FROM Rolprograma r where r.rolId.id=:rolid")
    public List<Rolprograma> findRolesprogramasByRol(@Param("rolid")Long rolid);
}
