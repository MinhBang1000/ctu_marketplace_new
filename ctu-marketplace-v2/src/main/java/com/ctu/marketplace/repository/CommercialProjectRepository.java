package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ctu.marketplace.entity.CommercialProject;
import com.ctu.marketplace.entity.Status;
import com.ctu.marketplace.entity.UserProfile;



@Repository
public interface CommercialProjectRepository extends JpaRepository<CommercialProject,Long> {
    Optional<CommercialProject> findByIdAndIsDeleted(Long commercialProjectId, Boolean isDeleted);
    List<CommercialProject> findByUserAndStatusAndIsDeleted(UserProfile userProfile, Status status, Boolean isDeleted);
    List<CommercialProject> findByStatusAndIsDeleted(Status status, Boolean isDeleted);
}
