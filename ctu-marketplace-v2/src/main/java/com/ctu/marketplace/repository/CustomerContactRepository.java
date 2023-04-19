package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ctu.marketplace.entity.CustomerContact;

@Repository
public interface CustomerContactRepository extends JpaRepository<CustomerContact, Long> {
    Optional<CustomerContact> findByIdAndIsDeleted(Long customerContactId, Boolean isDeteled);
    List<CustomerContact> findAllByIsDeleted(Boolean isDeleted);
    
    @Query(value = "SELECT cc FROM CustomerContact cc INNER JOIN Project p ON cc.project = p.id INNER JOIN UserProfile u ON p.user = u.id WHERE u.domain.code = 'DHCT' OR u.domain.code = 'KHC' AND p.isDeleted = false")
    public List<CustomerContact> findAllByDomainCTUAndKHC();

    @Query(value = "SELECT cc FROM CustomerContact cc INNER JOIN Project p ON cc.project = p.id INNER JOIN UserProfile u ON p.user = u.id WHERE u.domain.id = :id AND p.isDeleted = false")
    public List<CustomerContact> findAllByDomainId(@Param("id") Long domainId);
}
