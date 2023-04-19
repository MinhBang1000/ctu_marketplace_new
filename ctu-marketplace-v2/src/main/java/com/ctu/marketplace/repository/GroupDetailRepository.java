package com.ctu.marketplace.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ctu.marketplace.entity.GroupDetail;
// import com.ctu.marketplace.entity.GroupDetailPK;

@Repository
public interface GroupDetailRepository extends JpaRepository<GroupDetail, Long> {
    // public GroupDetail findOneById(GroupDetailPK id);

    // public List<GroupDetail> findAllByResearchGroupId(Long id);

    // @Transactional
    // @Modifying
    // @Query("Delete from GroupDetail gd where gd.id.userProfileId = :uid and gd.id.researchGroupId = :rgid and gd.id.roleOfGroupId = :rogid ")
    // public void deleteGroupDetailById(@Param("uid") Long uid,@Param("rgid") Long rgid,@Param("rogid") Long rogid);
    public List<GroupDetail> findAllByResearchGroupId(Long researchGroupId);
}
