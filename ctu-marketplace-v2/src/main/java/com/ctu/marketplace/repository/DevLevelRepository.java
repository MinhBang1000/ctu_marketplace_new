package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ctu.marketplace.entity.DevLevel;


@Repository
public interface DevLevelRepository extends JpaRepository<DevLevel,Long> {
    List<DevLevel> findByIdOrCode(Long devLevelId,String code);
    Optional<DevLevel> findByCode(String code);
}
