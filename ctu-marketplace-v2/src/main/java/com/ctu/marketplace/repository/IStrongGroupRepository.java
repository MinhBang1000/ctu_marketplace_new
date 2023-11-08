package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.StrongGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStrongGroupRepository extends JpaRepository<StrongGroup, Long> {
}
