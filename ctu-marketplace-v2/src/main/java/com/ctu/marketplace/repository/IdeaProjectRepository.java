package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import com.ctu.marketplace.entity.IdeaProject;
import com.ctu.marketplace.entity.Status;
import com.ctu.marketplace.entity.UserProfile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface IdeaProjectRepository extends JpaRepository<IdeaProject,Long> {
    Optional<IdeaProject>  findByIdAndIsDeleted(Long ideaProjectId, Boolean isDeleted);
    List<IdeaProject> findByUserAndStatusAndIsDeleted(UserProfile userProfile, Status status, Boolean isDeleted);
    List<IdeaProject> findByStatusAndIsDeleted(Status status, Boolean isDeleted);
}
