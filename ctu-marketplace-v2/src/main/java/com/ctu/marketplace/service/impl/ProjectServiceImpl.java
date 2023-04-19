package com.ctu.marketplace.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.config.GenerateDateTime;
import com.ctu.marketplace.dto.request.ApproveProjectDto;
import com.ctu.marketplace.entity.Project;
import com.ctu.marketplace.entity.ProjectField;
import com.ctu.marketplace.entity.Status;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.ProjectRepository;
import com.ctu.marketplace.service.EmailService;
import com.ctu.marketplace.service.ProjectService;
import com.ctu.marketplace.service.StatusService;
import com.ctu.marketplace.service.UserProfileService;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private StatusService statusService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private GenerateDateTime generateDateTime;

    @Override
    public Project getById(Long projectId) {
        return projectRepository.findByIdAndIsDeleted(projectId, false).orElse(null);
    }

    // RESEARCHER
    @Override
    public List<Project> getAllByUserId(Long userId) {
        return projectRepository.findAllByUser(userId);
    }

    @Override
    public List<Project> getAllByUserIdAndStatusIdAndType(Long userId, Long statusId, String projectType) {
        return projectRepository.findAllByUserAndStatusAndType(userId, statusId, projectType);
    }

    @Override
    public List<Project> getAllByStatusDD() {
        try {
            Status sts = statusService.getById(Constant.PROJECT_CODE_DD);
            return projectRepository.findAllByStatusAndIsDeletedOrderByRankingAsc(sts, false);
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public List<Project> searchByNameAndStatusDD(String name) {
        return projectRepository.findAllByStatusDDAndName(name);
    }

    // ADMIN
    @Override
    public List<Project> getAllByUserAdminId(Long userId) {
        try {
            UserProfile userProfile = userProfileService.getById(userId);
            List<Project> projects = null;
            if (userProfile.getRole().getId() == Constant.ROLE_SUPER_ADMIN_ID) {
                projects = projectRepository.findAllProject();
            }
            if (userProfile.getRole().getId() == Constant.ROLE_ADMIN_ID) {
                projects = projectRepository.findAllByDomain(userProfile.getDomain().getId());
            }
            return projects;
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public List<Project> getAllByDomainAndStatusAndType(Long userId, Long statusId, String projectType) {
        try {
            UserProfile userProfile = userProfileService.getById(userId);
            List<Project> projects = new ArrayList<>();
            if (userProfile.getRole().getId() == Constant.ROLE_SUPER_ADMIN_ID) {
                projects = projectRepository.findAllByStatusAndType(statusId, projectType);
            }
            if (userProfile.getRole().getId() == Constant.ROLE_ADMIN_ID) {
                projects = projectRepository.findAllByDomainAndStatusAndType(userProfile.getDomain().getId(),
                        statusId, projectType);
            }
            return projects;
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public boolean updateRanking(Long ranking, Long id) {
        try {
            projectRepository.updateRankingOfProject(id, ranking);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateHighLight(boolean isHighlighted, Long id) {
        try {
            projectRepository.updateIsHighlightedOfProject(id, isHighlighted);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean approve(ApproveProjectDto approveProjectDto) {
        try {
            UserProfile userProfile = userProfileService.getById(approveProjectDto.getApproverId());
            Status status = statusService.getById(approveProjectDto.getStatusId());
            Project project = projectRepository.findByIdAndIsDeleted(approveProjectDto.getProjectId(), false)
                    .orElse(null);
            if (project == null)
                return false;
            projectRepository.approveProject(project.getId(), userProfile, status);
            String statusStr = "";
            if (status.getId() == Constant.PROJECT_CODE_DD) {
                statusStr = "đã được phê duyệt";
            } else {
                statusStr = "đã bị từ chối duyệt";
            }
            String content = "<h2>[CTU-MARKETPLACE] Thông báo phê duyệt dự án "
                    + generateDateTime.formatTime(project.getUpdatedDate())
                    + "</h2><div><p>Xin chào "
                    + project.getUser().getFullName()
                    + ",</p><p>Chúng tôi xin thông báo đến bạn thông tin dự án <span style='color:blue'>"
                    + "\"" + project.getName() + "\" "
                    + "</span>" + statusStr + " bởi <span style='color:blue'>" + "\""
                    + userProfile.getFullName() + "\""
                    + "</span> bạn vui lòng xem xét kỷ nội dung trước khi gửi.</p>"
                    + (status.getId() == Constant.PROJECT_CODE_DD ? ""
                            : "<span style='color:red'>Lý do: " + approveProjectDto.getReason() + "</span>")
                    + "<p>Trân trọng,<br> System Admin.</p></div>";
            emailService.sendNotificationMessage(project.getUser().getEmail(),
                    "[CTU-MARKETPLACE] PHÊ DUYỆT DỰ ÁN "
                            + generateDateTime.formatTime(project.getUpdatedDate()),
                    content,
                    userProfile.getEmail());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean deleteById(Long projectId) {
        try {
            projectRepository.deleteByProjectId(projectId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Project> getAllRelatedDescCreatedDate(Long projectId) {
        try {
            Project project = projectRepository.findByIdAndIsDeleted(projectId, false).orElse(null);
            if (project == null)
                return null;
            List<Long> fieldId = new ArrayList<>();
            for (ProjectField proField : project.getProjectFieldList()) {
                fieldId.add(proField.getId().getFieldId());
            }
            Page<Project> projectPage = null;
            if (project.getProjectType().equals("commercial"))
                projectPage = projectRepository.findAllByRelatedCommercialProjectDescCreatedDate(fieldId, projectId,
                        PageRequest.of(0, 3));
            if (project.getProjectType().equals("idea"))
                projectPage = projectRepository.findAllByRelatedIdeaProjectDescCreatedDate(fieldId, projectId,
                        PageRequest.of(0, 3));
            if (project.getProjectType().equals("researching"))
                projectPage = projectRepository.findAllByRelatedResearchingProjectDescCreatedDate(fieldId, projectId,
                        PageRequest.of(0, 3));
            return projectPage.getContent();
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}
