package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ctu.marketplace.entity.TransMethod;

@Repository
public interface TransMethodRepository extends JpaRepository<TransMethod,Long> {
    List<TransMethod> findByIdOrCode(Long transMethodId, String code);
    Optional<TransMethod> findByCode(String code);
}
