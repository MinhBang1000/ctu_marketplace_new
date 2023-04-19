package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ctu.marketplace.entity.RoleOfGroup;

@Repository
public interface RoleOfGroupRepository extends JpaRepository<RoleOfGroup,Long> {
    List<RoleOfGroup> findByIdOrCode(Long roleOfGroupId, String code);
    Optional<RoleOfGroup> findByCode(String code);
}
