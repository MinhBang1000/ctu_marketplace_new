package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.IntroductionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IntroductionInfoRepository extends JpaRepository<IntroductionInfo, Long> {
}
