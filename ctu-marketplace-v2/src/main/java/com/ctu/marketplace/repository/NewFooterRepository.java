package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.NewFooter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewFooterRepository extends JpaRepository<NewFooter,Long> {}
