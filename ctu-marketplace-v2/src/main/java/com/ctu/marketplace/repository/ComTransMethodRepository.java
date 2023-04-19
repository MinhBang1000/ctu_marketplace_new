package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.ComTransMethod;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface ComTransMethodRepository extends JpaRepository<ComTransMethod, Long> {
    @Transactional
    Integer deleteByCommercialProjectId(Long commercialProjectId);
}
