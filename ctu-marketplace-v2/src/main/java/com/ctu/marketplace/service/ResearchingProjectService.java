package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.ResearchingProjectDto;
import com.ctu.marketplace.entity.ResearchingProject;

public interface ResearchingProjectService {
    public ResearchingProject getById(Long researchingProjectId);
    public ResearchingProject create(ResearchingProjectDto researchingProjectDto);
    public ResearchingProject update(Long researchingProjectId, ResearchingProjectDto researchingProjectDto);
    public ResearchingProject createDraft(ResearchingProjectDto researchingProjectDto);
    public ResearchingProject updateDraft(Long researchingProjectId, ResearchingProjectDto researchingProjectDto);
    public List<ResearchingProject> getAllByStatusDD();

}
