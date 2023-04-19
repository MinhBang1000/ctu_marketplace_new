package com.ctu.marketplace.service;

import com.ctu.marketplace.entity.ProjectField;

public interface ProjectFieldService {
    public ProjectField create(Long projectId, Long fieldId);

    public boolean deleteByProjectId(Long projectId);
}
