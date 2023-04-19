package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ctu.marketplace.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
    List<Role> findByIdOrCode(Long roleId, String code);
    Optional<Role> findByCode(String code);
}
