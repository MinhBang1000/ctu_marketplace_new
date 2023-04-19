package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ctu.marketplace.entity.Project;
import com.ctu.marketplace.entity.Status;
import com.ctu.marketplace.entity.UserProfile;

@Repository
public interface ProjectRepository extends PagingAndSortingRepository<Project, Long> {
        Optional<Project> findByIdAndIsDeleted(Long projectId, Boolean isDeleted);

        // public
        List<Project> findAllByStatusAndIsDeletedOrderByRankingAsc(Status status, Boolean isDeleted);

        @Query("SELECT DISTINCT p FROM Project p LEFT JOIN ProjectField pf ON p.id = pf.id.projectId WHERE p.projectType = 'commercial' AND pf.id.fieldId IN :fieldId AND p.isDeleted = false AND p.status.id = 101 AND p.id != :projectId ORDER BY p.createdDate DESC")
        Page<Project> findAllByRelatedCommercialProjectDescCreatedDate(@Param("fieldId") List<Long> fieldId,
                        @Param("projectId") Long projectId, Pageable pageable);

        // Get related project
        @Query("SELECT DISTINCT p FROM Project p LEFT JOIN ProjectField pf ON p.id = pf.id.projectId WHERE p.projectType = 'idea' AND pf.id.fieldId IN :fieldId AND p.isDeleted = false AND p.status.id = 101 AND p.id != :projectId ORDER BY p.createdDate DESC")
        Page<Project> findAllByRelatedIdeaProjectDescCreatedDate(@Param("fieldId") List<Long> fieldId,
                        @Param("projectId") Long projectId, Pageable pageable);

        // Get related project
        @Query("SELECT DISTINCT p FROM Project p LEFT JOIN ProjectField pf ON p.id = pf.id.projectId WHERE p.projectType = 'researching' AND pf.id.fieldId IN :fieldId AND p.isDeleted = false AND p.status.id = 101  AND p.id != :projectId ORDER BY p.createdDate DESC")
        Page<Project> findAllByRelatedResearchingProjectDescCreatedDate(@Param("fieldId") List<Long> fieldId,
                        @Param("projectId") Long projectId, Pageable pageable);

        @Query(value = "SELECT p FROM Project p WHERE p.status.id = 101 AND p.name LIKE %:name% AND p.isDeleted = false")
        List<Project> findAllByStatusDDAndName(@Param("name") String name);

        // researcher
        @Query(value = "SELECT p FROM Project p LEFT JOIN UserProfile u ON p.user = u.id WHERE u.id = :userId AND p.status.id = :statusId AND p.projectType = :projectType AND p.isDeleted = false")
        List<Project> findAllByUserAndStatusAndType(@Param("userId") Long userId, @Param("statusId") Long statusId,
                        @Param("projectType") String projectType);

        @Query(value = "SELECT p FROM Project p LEFT JOIN UserProfile u ON p.user = u.id WHERE u.id = :userId AND p.isDeleted = false")
        List<Project> findAllByUser(@Param("userId") Long userId);

        // admin
        @Query(value = "SELECT p FROM Project p LEFT JOIN UserProfile u ON p.user = u.id WHERE u.domain.id = :domainId AND p.isDeleted = false")
        List<Project> findAllByDomain(@Param("domainId") Long domainId);

        @Query(value = "SELECT p FROM Project p LEFT JOIN UserProfile u ON p.user = u.id WHERE p.isDeleted = false")
        List<Project> findAllProject();

        @Query(value = "SELECT p FROM Project p LEFT JOIN UserProfile u ON p.user = u.id WHERE p.status.id = :statusId AND p.projectType = :projectType AND p.isDeleted = false")
        List<Project> findAllByStatusAndType(@Param("statusId") Long statusId,
                        @Param("projectType") String projectType);

        @Query(value = "SELECT p FROM Project p LEFT JOIN UserProfile u ON p.user = u.id WHERE u.domain.id = :domainId AND p.status.id = :statusId AND p.projectType = :projectType AND p.isDeleted = false")
        List<Project> findAllByDomainAndStatusAndType(@Param("domainId") Long domainId,
                        @Param("statusId") Long statusId, @Param("projectType") String projectType);

        // approve
        @Query(value = "UPDATE Project SET approver = :approver, status = :status WHERE id = :id")
        @Modifying
        void approveProject(@Param("id") Long projectId, @Param("approver") UserProfile userProfile,
                        @Param("status") Status status);

        @Modifying
        @Query(value = "UPDATE Project SET ranking = :ranking WHERE id = :id")
        void updateRankingOfProject(@Param("id") Long projectId, @Param("ranking") Long ranking);

        @Modifying
        @Query(value = "UPDATE Project SET isDeleted = true WHERE id = :id")
        void deleteByProjectId(@Param("id") Long projectId);

        @Modifying
        @Query(value = "UPDATE Project SET isHighlighted = :isHighlighted WHERE id = :id")
        void updateIsHighlightedOfProject(@Param("id") Long projectId, @Param("isHighlighted") Boolean isHighlighted);
}
