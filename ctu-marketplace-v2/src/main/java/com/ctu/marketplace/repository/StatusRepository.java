package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ctu.marketplace.entity.Status;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
    List<Status> findByIdOrCode(Long statusId, String code);
    Optional<Status> findByCode(String code);
}
