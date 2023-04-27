package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.FkeyValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FkeyValueRepository extends JpaRepository<FkeyValue, Long> {
    
}
