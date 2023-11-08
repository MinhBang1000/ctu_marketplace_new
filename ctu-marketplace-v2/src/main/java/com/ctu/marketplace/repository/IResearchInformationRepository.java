package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.ResearchInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IResearchInformationRepository extends JpaRepository<ResearchInformation, Long> {
}
