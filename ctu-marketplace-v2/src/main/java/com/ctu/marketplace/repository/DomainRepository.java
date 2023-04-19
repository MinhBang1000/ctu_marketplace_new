package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.Domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DomainRepository  extends JpaRepository<Domain,Long> {
    List<Domain> findByIdOrCode(Long domainId, String code);
    Optional<Domain> findByCode(String code);
}
