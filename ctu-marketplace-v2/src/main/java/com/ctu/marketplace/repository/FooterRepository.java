package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.Footer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FooterRepository extends JpaRepository<Footer,Long> {
}
