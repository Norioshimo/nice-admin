package com.niceadmin.repository;

import com.niceadmin.entity.Programa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface  ProgramaRepository extends JpaRepository<Programa,Long>, JpaSpecificationExecutor<Programa> {


}
