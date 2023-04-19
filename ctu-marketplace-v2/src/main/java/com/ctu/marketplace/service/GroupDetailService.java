package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.GroupDetailWithAlreadyUserDto;
import com.ctu.marketplace.dto.request.GroupDetailWithNotAlreadyUserDto;
import com.ctu.marketplace.entity.GroupDetail;

public interface GroupDetailService {
        GroupDetail getById(Long groupDetailId);

        GroupDetail update(Long groupDetailId,
                        GroupDetailWithNotAlreadyUserDto groupDetailWithNotAlreadyUserDto);

        List<GroupDetail> getAllByResearchGroupId(Long researchGroupId);

        List<GroupDetail> createWithAlreadyUser(GroupDetailWithAlreadyUserDto groupDetailWithAlreadyUserDto);

        List<GroupDetail> createWithNotAlreadyUser(
                        GroupDetailWithNotAlreadyUserDto groupDetailWithNotAlreadyUserDto);

        boolean deleteById(Long groupDetailId);
}
