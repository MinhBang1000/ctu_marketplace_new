package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.ResearchGroupDto;
import com.ctu.marketplace.entity.ResearchGroup;

public interface ResearchGroupService {
    public ResearchGroup getById(Long researchGroupId);

    public List<ResearchGroup> getAll();

    public List<ResearchGroup> getAllByUserAdmin(Long userAdminId);

    public ResearchGroup create(ResearchGroupDto researchGroupDto);

    public ResearchGroup update(Long researchGroupId, ResearchGroupDto researchGroupDto);

    public boolean deleteById(Long researchGroupId);
}
