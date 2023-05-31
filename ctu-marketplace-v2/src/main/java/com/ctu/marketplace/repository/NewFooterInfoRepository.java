package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.NewFooterInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewFooterInfoRepository extends JpaRepository<NewFooterInfo,Long> {}
