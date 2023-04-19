package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.AboutPage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AboutPageRepository extends JpaRepository<AboutPage,Long> {
}
