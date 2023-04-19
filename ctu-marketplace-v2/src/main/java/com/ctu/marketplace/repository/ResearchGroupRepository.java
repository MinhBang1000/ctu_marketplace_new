package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ctu.marketplace.entity.ResearchGroup;

@Repository
public interface ResearchGroupRepository extends JpaRepository<ResearchGroup, Long> {
    List<ResearchGroup> findAllByIsDeleted(Boolean isDeleted);

    // admin
    @Query(value = "SELECT rg FROM ResearchGroup rg LEFT JOIN UserProfile u ON rg.userProfile  = u.id WHERE u.domain.id = :domainId AND rg.isDeleted = false")
    List<ResearchGroup> findAllResearchGroupByDomain(@Param("domainId") Long domainId);

    @Query(value = "SELECT rg FROM ResearchGroup rg LEFT JOIN UserProfile u ON rg.userProfile = u.id WHERE rg.isDeleted = false")
    List<ResearchGroup> findAllResearchGroup();

    Optional<ResearchGroup> findByIdAndIsDeleted(Long researchgroupId, Boolean isDeleted);

    // @Query(value = "SELECT rg FROM ResearchGroup rg LEFT JOIN UserProfile u ON
    // rg.userProfile = u.id WHERE u.domain = :domain AND rg.isDeleted = false")
    // public List<ResearchGroup> findAllResearchGroupByDomain(@Param("domain")
    // Domain domain);

}