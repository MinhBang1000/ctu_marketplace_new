package com.ctu.marketplace.repository;

import java.util.List;

import com.ctu.marketplace.entity.Function;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FunctionRepository extends JpaRepository<Function, Long> {
    @Query(value = "SELECT f FROM Function AS f INNER JOIN Role AS r on f.role.id = r.id WHERE r.code = :code")
    List<Function> findAllByRoleCode(@Param("code") String code);
    
    @Query(value = "SELECT f FROM Function AS f INNER JOIN Role AS r on f.role.id = r.id WHERE r.id = :id")
    List<Function> findAllByRoleId(@Param("id") Long id);
}
