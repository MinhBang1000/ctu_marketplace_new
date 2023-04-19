package com.ctu.marketplace.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.entity.ProjectField;
import com.ctu.marketplace.entity.ProjectFieldPK;
import com.ctu.marketplace.repository.ProjectFieldRepository;
import com.ctu.marketplace.service.FieldService;
import com.ctu.marketplace.service.ProjectFieldService;
import com.ctu.marketplace.service.ProjectService;

@Service
public class ProjectFieldServiceImpl implements ProjectFieldService {

    @Autowired
    private FieldService fieldService;
    @Autowired
    private ProjectFieldRepository projectFieldRepository;

    @Autowired
    private ProjectService projectService;

    @Override
    public ProjectField create(Long projectId, Long fieldId) {
        try {
            ProjectFieldPK id = new ProjectFieldPK(fieldId, projectId);
            ProjectField projectField = new ProjectField();
            projectField.setId(id);
            projectField.setField(fieldService.getById(fieldId));
            projectField.setProject(projectService.getById(projectId));
            return projectFieldRepository.save(projectField);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteByProjectId(Long projectId) {
        try {
            projectFieldRepository.deleteByProjectId(projectId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
