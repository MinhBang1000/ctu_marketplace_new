package com.ctu.marketplace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ctu.marketplace.entity.UserFunction;

@Repository
public interface UserFunctionRepository extends JpaRepository<UserFunction, Long> {
    List<UserFunction> findAllByUserProfileId(Long userProfileId);

    Optional<UserFunction> findByUserProfileIdAndFunctionId(Long userProfileId, Long functionId);

    @Transactional
    Integer deleteByUserProfileId(Long userProfileId);

    @Transactional
    Integer deleteByUserProfileIdAndFunctionId(Long userProfileId, Long functionId);
}
