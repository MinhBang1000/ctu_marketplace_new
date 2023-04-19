package com.ctu.marketplace.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.config.GenerateDateTime;
import com.ctu.marketplace.dto.request.IdeaProjectDto;
import com.ctu.marketplace.entity.Field;
import com.ctu.marketplace.entity.IdeaProject;
import com.ctu.marketplace.entity.ProjectField;
import com.ctu.marketplace.entity.Status;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.IdeaProjectRepository;
import com.ctu.marketplace.service.EmailService;
import com.ctu.marketplace.service.FieldService;
import com.ctu.marketplace.service.IdeaProjectService;
import com.ctu.marketplace.service.ProjectFieldService;
import com.ctu.marketplace.service.StatusService;
import com.ctu.marketplace.service.UserProfileService;

@Service
public class IdeaProjectServiceImpl implements IdeaProjectService {
    private static final Logger LOGGER = LogManager.getLogger(ResearchingProjectServiceImpl.class);

    @Autowired
    private IdeaProjectRepository ideaProjectRepository;
    @Autowired
    private StatusService statusService;
    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private FieldService fieldService;
    @Autowired
    private ProjectFieldService projectFieldService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private GenerateDateTime generateDateTime;

    @Override
    public IdeaProject getById(Long ideaProjectId) {
        return ideaProjectRepository.findByIdAndIsDeleted(ideaProjectId, false).orElse(null);
    }

    @Override
    public IdeaProject create(IdeaProjectDto ideaProjectDto) {
        try {
            IdeaProject ideaProject = new IdeaProject();
            ideaProject.setProjectType(Constant.PROJECT_TYPE_IDEA);
            ideaProject.setName(ideaProjectDto.getName());
            ideaProject.setShortDescription(ideaProjectDto.getShortDescription());
            ideaProject.setAddress(ideaProjectDto.getAddress());
            ideaProject.setTemplate(ideaProjectDto.getTemplate());
            ideaProject.setCompanyName(ideaProjectDto.getCompanyName());
            ideaProject.setPhoneNumber(ideaProjectDto.getPhoneNumber());
            ideaProject.setEmail(ideaProjectDto.getEmail());
            ideaProject.setAuthor(ideaProjectDto.getAuthor());
            ideaProject.setWebsite(ideaProjectDto.getWebsite());
            ideaProject.setFax(ideaProjectDto.getFax());
            ideaProject.setIsHighlighted(false);
            ideaProject.setRanking(-1L);
            ideaProject.setProjectImage(ideaProjectDto.getProjectImage());
            ideaProject.setApprover(null);
            ideaProject.setStatus(statusService.getById(Constant.PROJECT_CODE_CD));
            ideaProject.setIsDeleted(false);
            ideaProject.setDescription(ideaProjectDto.getDescription());
            ideaProject.setScope(ideaProjectDto.getScope());
            List<ProjectField> projectFields = ideaProjectDto.getFieldIdList().stream().map(fieldId -> {
                Field field = fieldService.getById(fieldId);
                ProjectField newProjectField = new ProjectField();
                newProjectField.setProject(ideaProject);
                newProjectField.setField(field);
                return newProjectField;
            }).collect(Collectors.toList());
            ideaProject.setProjectFieldList(projectFields);
            UserProfile userProfile = userProfileService.getById(ideaProjectDto.getUserId());
            if (userProfile == null) {
                LOGGER.info("User not found!");
                return null;
            }
            ideaProject.setUser(userProfile);
            IdeaProject ideaProjectCreated = ideaProjectRepository.save(ideaProject);
            List<UserProfile> userProfileAdmin = userProfileService
                    .getAllUserAdminByDomainId(userProfile.getDomain().getId());
            if (!userProfileAdmin.isEmpty()) {
                for (UserProfile userAdmin : userProfileAdmin) {
                    String content = "<h2>[CTU-MARKETPLACE] Thông báo tạo dự án "
                            + generateDateTime.formatTime(ideaProjectCreated.getUpdatedDate())
                            + "</h2><div><p>Xin chào "
                            + userAdmin.getFullName()
                            + ",</p><p>Chúng tôi xin thông báo đến bạn thông tin dự án <span style='color:blue'>"
                            + "\"" + ideaProjectCreated.getName() + "\""
                            + "</span> đã được tạo bởi <span style='color:blue'>" + "\","
                            + ideaProjectCreated.getUser().getFullName() + "\""
                            + "</span> bạn vui lòng xem xét kỷ nội dung trước khi tiến hành phê duyệt hoặc từ chối.</p><p>Trân trọng,<br> System Admin.</p></div>";
                    emailService.sendNotificationMessage(userAdmin.getEmail(),
                            "[CTU-MARKETPLACE] TẠO DỰ ÁN "
                                    + generateDateTime.formatTime(ideaProjectCreated.getUpdatedDate()),
                            content,
                            ideaProjectCreated.getUser().getEmail());
                }
            }
            return ideaProjectCreated;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public IdeaProject update(Long ideaProjectId, IdeaProjectDto ideaProjectDto) {
        try {
            IdeaProject ideaProject = ideaProjectRepository.findByIdAndIsDeleted(ideaProjectId, false).orElse(null);
            if (ideaProject == null) {
                LOGGER.info("Idea project not found!");
                return null;
            }
            ideaProject.setProjectType(Constant.PROJECT_TYPE_IDEA);
            ideaProject.setName(ideaProjectDto.getName());
            ideaProject.setShortDescription(ideaProjectDto.getShortDescription());
            ideaProject.setAddress(ideaProjectDto.getAddress());
            ideaProject.setTemplate(ideaProjectDto.getTemplate());
            ideaProject.setCompanyName(ideaProjectDto.getCompanyName());
            ideaProject.setPhoneNumber(ideaProjectDto.getPhoneNumber());
            ideaProject.setEmail(ideaProjectDto.getEmail());
            ideaProject.setAuthor(ideaProjectDto.getAuthor());
            ideaProject.setWebsite(ideaProjectDto.getWebsite());
            ideaProject.setFax(ideaProjectDto.getFax());
            ideaProject.setIsHighlighted(false);
            ideaProject.setRanking(-1L);
            ideaProject.setProjectImage(ideaProjectDto.getProjectImage());
            ideaProject.setApprover(null);
            ideaProject.setStatus(statusService.getById(Constant.PROJECT_CODE_CD));
            ideaProject.setIsDeleted(false);
            ideaProject.setDescription(ideaProjectDto.getDescription());
            ideaProject.setScope(ideaProjectDto.getScope());
            projectFieldService.deleteByProjectId(ideaProject.getId());
            List<ProjectField> projectFields = ideaProjectDto.getFieldIdList().stream().map(fieldId -> {
                Field field = fieldService.getById(fieldId);
                ProjectField newProjectField = new ProjectField();
                newProjectField.setProject(ideaProject);
                newProjectField.setField(field);
                return newProjectField;
            }).collect(Collectors.toList());
            ideaProject.setProjectFieldList(projectFields);
            IdeaProject ideaProjectUpdated = ideaProjectRepository.save(ideaProject);
            List<UserProfile> userProfileAdmin = userProfileService
                    .getAllUserAdminByDomainId(ideaProjectUpdated.getUser().getDomain().getId());
            if (!userProfileAdmin.isEmpty()) {
                for (UserProfile userAdmin : userProfileAdmin) {
                    String content = "<h2>[CTU-MARKETPLACE] Thông báo cập nhật dự án "
                            + generateDateTime.formatTime(ideaProjectUpdated.getUpdatedDate())
                            + "</h2><div><p>Xin chào "
                            + userAdmin.getFullName()
                            + ",</p><p>Chúng tôi xin thông báo đến bạn thông tin dự án <span style='color:blue'>"
                            + "\"" + ideaProjectUpdated.getName() + "\""
                            + "</span> đã được cập nhật bởi <span style='color:blue'>" + "\","
                            + ideaProjectUpdated.getUser().getFullName() + "\""
                            + "</span> bạn vui lòng xem xét kỷ nội dung trước khi tiến hành phê duyệt hoặc từ chối.</p><p>Trân trọng,<br> System Admin.</p></div>";
                    emailService.sendNotificationMessage(userAdmin.getEmail(),
                            "[CTU-MARKETPLACE] CẬP NHẬT DỰ ÁN "
                                    + generateDateTime.formatTime(ideaProjectUpdated.getUpdatedDate()),
                            content,
                            ideaProjectUpdated.getUser().getEmail());
                }
            }
            return ideaProjectUpdated;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public List<IdeaProject> getAllByStatusDD() {
        Status sts = statusService.getById(Constant.PROJECT_CODE_DD);
        return ideaProjectRepository.findByStatusAndIsDeleted(sts, false);
    }

    @Override
    public IdeaProject createDraft(IdeaProjectDto ideaProjectDto) {
        try {
            IdeaProject ideaProject = new IdeaProject();
            ideaProject.setProjectType(Constant.PROJECT_TYPE_IDEA);
            ideaProject.setName(ideaProjectDto.getName());
            ideaProject.setShortDescription(ideaProjectDto.getShortDescription());
            ideaProject.setAddress(ideaProjectDto.getAddress());
            ideaProject.setTemplate(ideaProjectDto.getTemplate());
            ideaProject.setCompanyName(ideaProjectDto.getCompanyName());
            ideaProject.setPhoneNumber(ideaProjectDto.getPhoneNumber());
            ideaProject.setEmail(ideaProjectDto.getEmail());
            ideaProject.setAuthor(ideaProjectDto.getAuthor());
            ideaProject.setWebsite(ideaProjectDto.getWebsite());
            ideaProject.setFax(ideaProjectDto.getFax());
            ideaProject.setIsHighlighted(false);
            ideaProject.setRanking(-1L);
            ideaProject.setProjectImage(ideaProjectDto.getProjectImage());
            ideaProject.setApprover(null);
            ideaProject.setStatus(statusService.getById(Constant.PROJECT_CODE_LN));
            ideaProject.setIsDeleted(false);
            ideaProject.setDescription(ideaProjectDto.getDescription());
            ideaProject.setScope(ideaProjectDto.getScope());
            List<ProjectField> projectFields = null;
            if (ideaProjectDto.getFieldIdList() != null) {
                projectFields = ideaProjectDto.getFieldIdList().stream().map(fieldId -> {
                    Field field = fieldService.getById(fieldId);
                    ProjectField newProjectField = new ProjectField();
                    newProjectField.setProject(ideaProject);
                    newProjectField.setField(field);
                    return newProjectField;
                }).collect(Collectors.toList());
            }
            ideaProject.setProjectFieldList(projectFields);
            UserProfile userProfile = userProfileService.getById(ideaProjectDto.getUserId());
            if (userProfile == null) {
                LOGGER.info("User not found!");
                return null;
            }
            ideaProject.setUser(userProfile);
            IdeaProject ideaProjectCreated = ideaProjectRepository.save(ideaProject);
            return ideaProjectCreated;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public IdeaProject updateDraft(Long ideaProjectId, IdeaProjectDto ideaProjectDto) {
        try {
            IdeaProject ideaProject = ideaProjectRepository.findByIdAndIsDeleted(ideaProjectId, false).orElse(null);
            if (ideaProject == null) {
                LOGGER.info("Idea project not found!");
                return null;
            }
            ideaProject.setProjectType(Constant.PROJECT_TYPE_IDEA);
            ideaProject.setName(ideaProjectDto.getName());
            ideaProject.setShortDescription(ideaProjectDto.getShortDescription());
            ideaProject.setAddress(ideaProjectDto.getAddress());
            ideaProject.setTemplate(ideaProjectDto.getTemplate());
            ideaProject.setCompanyName(ideaProjectDto.getCompanyName());
            ideaProject.setPhoneNumber(ideaProjectDto.getPhoneNumber());
            ideaProject.setEmail(ideaProjectDto.getEmail());
            ideaProject.setAuthor(ideaProjectDto.getAuthor());
            ideaProject.setWebsite(ideaProjectDto.getWebsite());
            ideaProject.setFax(ideaProjectDto.getFax());
            ideaProject.setIsHighlighted(false);
            ideaProject.setRanking(-1L);
            ideaProject.setProjectImage(ideaProjectDto.getProjectImage());
            ideaProject.setApprover(null);
            ideaProject.setStatus(statusService.getById(Constant.PROJECT_CODE_LN));
            ideaProject.setIsDeleted(false);
            ideaProject.setDescription(ideaProjectDto.getDescription());
            ideaProject.setScope(ideaProjectDto.getScope());
            projectFieldService.deleteByProjectId(ideaProject.getId());
            List<ProjectField> projectFields = null;
            if (ideaProjectDto.getFieldIdList() != null) {
                projectFields = ideaProjectDto.getFieldIdList().stream().map(fieldId -> {
                    Field field = fieldService.getById(fieldId);
                    ProjectField newProjectField = new ProjectField();
                    newProjectField.setProject(ideaProject);
                    newProjectField.setField(field);
                    return newProjectField;
                }).collect(Collectors.toList());
            }
            ideaProject.setProjectFieldList(projectFields);
            IdeaProject ideaProjectUpdated = ideaProjectRepository.save(ideaProject);
            return ideaProjectUpdated;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
