package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.NewProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewProjectRepository extends JpaRepository<NewProject,Long> {
    List<NewProject> findAllByIsTemplate(Boolean target);
    List<NewProject> findByNameContaining(String search);
}
