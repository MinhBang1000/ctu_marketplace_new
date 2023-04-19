package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import com.ctu.marketplace.entity.ResearchingProject;
import com.ctu.marketplace.entity.Status;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResearchingProjectRepository extends JpaRepository<ResearchingProject, Long> {
    Optional<ResearchingProject> findByIdAndIsDeleted(Long researchingProjectId, Boolean isDeleted);
    List<ResearchingProject> findAllByStatusAndIsDeleted(Status status, Boolean isDeleted);
}
