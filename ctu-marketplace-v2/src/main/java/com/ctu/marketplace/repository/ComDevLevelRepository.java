package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.ComDevLevel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface ComDevLevelRepository extends JpaRepository<ComDevLevel,Long> {
    @Transactional
    Integer deleteByCommercialProjectId(Long commercialProjectId);
}
