package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.ProjectField;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface ProjectFieldRepository extends JpaRepository<ProjectField,Long> {
    @Transactional
    Integer deleteByProjectId(Long projectId);
}
