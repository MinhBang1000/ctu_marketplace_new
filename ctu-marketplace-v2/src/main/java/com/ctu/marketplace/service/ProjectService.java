package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.ApproveProjectDto;
import com.ctu.marketplace.entity.Project;

public interface ProjectService {
     Project getById(Long projectId);
     List<Project> getAllByStatusDD();
     List<Project> searchByNameAndStatusDD(String name);

     List<Project> getAllRelatedDescCreatedDate(Long projectId);

     // researcher
     List<Project> getAllByUserId(Long userId);
     List<Project> getAllByUserIdAndStatusIdAndType(Long userId, Long statusId,String projectType);

     // admin
     List<Project> getAllByUserAdminId(Long userId);
     List<Project> getAllByDomainAndStatusAndType(Long userId, Long statusId, String projectType);

     // admin
     boolean approve(ApproveProjectDto approveProjectDto);
     boolean updateRanking(Long ranking, Long projectId);
     boolean updateHighLight(boolean isHighlighted, Long projectId);

     boolean deleteById(Long projectId);
}
