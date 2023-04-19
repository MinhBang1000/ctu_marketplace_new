package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.IdeaProjectDto;
import com.ctu.marketplace.entity.IdeaProject;

public interface IdeaProjectService {
    IdeaProject getById(Long ideaProjectId);

    IdeaProject create(IdeaProjectDto ideaProjectDto);

    IdeaProject update(Long ideaProjectId, IdeaProjectDto ideaProjectDto);

    IdeaProject createDraft(IdeaProjectDto ideaProjectDto);

    IdeaProject updateDraft(Long ideaProjectId, IdeaProjectDto ideaProjectDto);

    List<IdeaProject> getAllByStatusDD();

}
