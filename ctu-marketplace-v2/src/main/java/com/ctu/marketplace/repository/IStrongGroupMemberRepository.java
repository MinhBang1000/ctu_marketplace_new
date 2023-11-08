package com.ctu.marketplace.repository;

import com.ctu.marketplace.entity.StrongGroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStrongGroupMemberRepository extends JpaRepository<StrongGroupMember, Long> {
}
