package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.PasswordResetCode;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordResetCodeRepository extends JpaRepository<PasswordResetCode,Long>{
    PasswordResetCode findOneById(Long id);
}
