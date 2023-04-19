package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.Faq;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaqRepository extends JpaRepository<Faq,Long> {
}
