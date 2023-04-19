package com.ctu.marketplace.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.config.GenerateDateTime;
import com.ctu.marketplace.dto.request.ResearchingProjectDto;
import com.ctu.marketplace.entity.Field;
import com.ctu.marketplace.entity.ProjectField;
import com.ctu.marketplace.entity.ResearchingProject;
import com.ctu.marketplace.entity.Status;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.ResearchingProjectRepository;
import com.ctu.marketplace.service.EmailService;
import com.ctu.marketplace.service.FieldService;
import com.ctu.marketplace.service.ProjectFieldService;
import com.ctu.marketplace.service.ResearchingProjectService;
import com.ctu.marketplace.service.StatusService;
import com.ctu.marketplace.service.UserProfileService;

@Service
public class ResearchingProjectServiceImpl implements ResearchingProjectService {
    private static final Logger LOGGER = LogManager.getLogger(ResearchingProjectServiceImpl.class);

    @Autowired
    private ResearchingProjectRepository researchingProjectRepository;
    @Autowired
    private ProjectFieldService projectFieldService;
    @Autowired
    private StatusService statusService;
    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private FieldService fieldService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private GenerateDateTime generateDateTime;

    @Override
    public ResearchingProject getById(Long id) {
        return researchingProjectRepository.findByIdAndIsDeleted(id, false)
                .orElse(null);
    }

    @Override
    public ResearchingProject create(ResearchingProjectDto researchingProjectDto) {
        try {
            ResearchingProject researchingProject = new ResearchingProject();
            researchingProject.setName(researchingProjectDto.getName());
            researchingProject.setShortDescription(researchingProjectDto.getShortDescription());
            researchingProject.setAddress(researchingProjectDto.getAddress());
            researchingProject.setTemplate(researchingProjectDto.getTemplate());
            researchingProject.setCompanyName(researchingProjectDto.getCompanyName());
            researchingProject.setPhoneNumber(researchingProjectDto.getPhoneNumber());
            researchingProject.setEmail(researchingProjectDto.getEmail());
            researchingProject.setAuthor(researchingProjectDto.getAuthor());
            researchingProject.setWebsite(researchingProjectDto.getWebsite());
            researchingProject.setFax(researchingProjectDto.getFax());
            researchingProject.setIsHighlighted(false);
            researchingProject.setRanking(-1L);
            researchingProject.setProjectImage(researchingProjectDto.getProjectImage());
            researchingProject.setApprover(null);
            researchingProject.setStatus(statusService.getById(Constant.PROJECT_CODE_CD));
            researchingProject.setIsDeleted(false);
            researchingProject.setChallenge(researchingProjectDto.getChallenge());
            researchingProject.setSolution(researchingProjectDto.getSolution());
            researchingProject.setBenefit(researchingProjectDto.getBenefit());
            researchingProject.setProjectType(Constant.PROJECT_TYPE_RESEARCHING);
            List<ProjectField> projectFields = researchingProjectDto.getFieldIdList().stream().map(fieldId -> {
                Field field = fieldService.getById(fieldId);
                ProjectField newProjectField = new ProjectField();
                newProjectField.setProject(researchingProject);
                newProjectField.setField(field);
                return newProjectField;
            }).collect(Collectors.toList());
            researchingProject.setProjectFieldList(projectFields);
            UserProfile userProfile = userProfileService.getById(researchingProjectDto.getUserId());
            if (userProfile == null) {
                LOGGER.info("User not found!");
                return null;
            }
            researchingProject.setUser(userProfile);
            ResearchingProject researchingProjectCreated = researchingProjectRepository.save(researchingProject);
            List<UserProfile> userProfileAdmin = userProfileService
                    .getAllUserAdminByDomainId(userProfile.getDomain().getId());
            if (!userProfileAdmin.isEmpty()
                    && (researchingProjectCreated.getStatus().getId() != Constant.PROJECT_CODE_LN)) {
                for (UserProfile userAdmin : userProfileAdmin) {
                    String content = "<h2>[CTU-MARKETPLACE] Thông báo tạo dự án "
                            + generateDateTime.formatTime(researchingProjectCreated.getCreatedDate())
                            + "</h2><div><p>Xin chào "
                            + userAdmin.getFullName()
                            + ",</p><p>Chúng tôi xin thông báo đến bạn thông tin dự án <span style='color:blue'>"
                            + "\"" + researchingProjectCreated.getName() + "\""
                            + "</span> đã được tạo bởi <span style='color:blue'>" + "\","
                            + researchingProjectCreated.getUser().getFullName() + "\""
                            + "</span> bạn vui lòng xem xét kỷ nội dung trước khi tiến hành phê duyệt hoặc từ chối.</p><p>Trân trọng,<br> System Admin.</p></div>";
                    emailService.sendNotificationMessage(userAdmin.getEmail(),
                            "[CTU-MARKETPLACE] TẠO DỰ ÁN "
                                    + generateDateTime.formatTime(researchingProjectCreated.getCreatedDate()),
                            content,
                            researchingProjectCreated.getUser().getEmail());
                }
            }
            return researchingProjectCreated;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public ResearchingProject update(Long researchingProjectId, ResearchingProjectDto researchingProjectDto) {
        try {
            ResearchingProject researchingProject = researchingProjectRepository
                    .findByIdAndIsDeleted(researchingProjectId, false)
                    .orElse(null);
            if (researchingProject == null) {
                LOGGER.info("Researching project not found!");
                return null;
            }
            researchingProject.setName(researchingProjectDto.getName());
            researchingProject.setShortDescription(researchingProjectDto.getShortDescription());
            researchingProject.setAddress(researchingProjectDto.getAddress());
            researchingProject.setTemplate(researchingProjectDto.getTemplate());
            researchingProject.setCompanyName(researchingProjectDto.getCompanyName());
            researchingProject.setPhoneNumber(researchingProjectDto.getPhoneNumber());
            researchingProject.setEmail(researchingProjectDto.getEmail());
            researchingProject.setAuthor(researchingProjectDto.getAuthor());
            researchingProject.setWebsite(researchingProjectDto.getWebsite());
            researchingProject.setFax(researchingProjectDto.getFax());
            researchingProject.setIsHighlighted(false);
            researchingProject.setRanking(-1L);
            researchingProject.setProjectImage(researchingProjectDto.getProjectImage());
            researchingProject.setApprover(null);
            researchingProject.setStatus(statusService.getById(Constant.PROJECT_CODE_CD));
            researchingProject.setIsDeleted(false);
            researchingProject.setChallenge(researchingProjectDto.getChallenge());
            researchingProject.setSolution(researchingProjectDto.getSolution());
            researchingProject.setBenefit(researchingProjectDto.getBenefit());
            researchingProject.setProjectType(Constant.PROJECT_TYPE_RESEARCHING);
            projectFieldService.deleteByProjectId(researchingProject.getId());
            List<ProjectField> projectFields = researchingProjectDto.getFieldIdList().stream().map(fieldId -> {
                Field field = fieldService.getById(fieldId);
                ProjectField newProjectField = new ProjectField();
                newProjectField.setProject(researchingProject);
                newProjectField.setField(field);
                return newProjectField;
            }).collect(Collectors.toList());
            researchingProject.setProjectFieldList(projectFields);
            ResearchingProject researchingProjectUpdated = researchingProjectRepository.save(researchingProject);
            List<UserProfile> userProfileAdmin = userProfileService
                    .getAllUserAdminByDomainId(researchingProjectUpdated.getUser().getDomain().getId());
            if (!userProfileAdmin.isEmpty()
                    && (researchingProjectUpdated.getStatus().getId() != Constant.PROJECT_CODE_LN)) {
                for (UserProfile userAdmin : userProfileAdmin) {
                    String content = "<h2>[CTU-MARKETPLACE] Thông báo cập nhật dự án "
                            + generateDateTime.formatTime(researchingProjectUpdated.getUpdatedDate())
                            + "</h2><div><p>Xin chào "
                            + userAdmin.getFullName()
                            + ",</p><p>Chúng tôi xin thông báo đến bạn thông tin dự án <span style='color:blue'>"
                            + "\"" + researchingProjectUpdated.getName() + "\""
                            + "</span> đã được cập nhật bởi <span style='color:blue'>" + "\","
                            + researchingProjectUpdated.getUser().getFullName() + "\""
                            + "</span> bạn vui lòng xem xét kỷ nội dung trước khi tiến hành phê duyệt hoặc từ chối.</p><p>Trân trọng,<br> System Admin.</p></div>";
                    emailService.sendNotificationMessage(userAdmin.getEmail(),
                            "[CTU-MARKETPLACE] CẬP NHẬT DỰ ÁN "
                                    + generateDateTime.formatTime(researchingProjectUpdated.getCreatedDate()),
                            content,
                            researchingProjectUpdated.getUser().getEmail());
                }
            }
            return researchingProjectUpdated;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<ResearchingProject> getAllByStatusDD() {
        Status sts = statusService.getById(Constant.PROJECT_CODE_DD);
        return researchingProjectRepository.findAllByStatusAndIsDeleted(sts,
                false);
    }

    @Override
    public ResearchingProject createDraft(ResearchingProjectDto researchingProjectDto) {
        try {
            ResearchingProject researchingProject = new ResearchingProject();
            researchingProject.setName(researchingProjectDto.getName());
            researchingProject.setShortDescription(researchingProjectDto.getShortDescription());
            researchingProject.setAddress(researchingProjectDto.getAddress());
            researchingProject.setTemplate(researchingProjectDto.getTemplate());
            researchingProject.setCompanyName(researchingProjectDto.getCompanyName());
            researchingProject.setPhoneNumber(researchingProjectDto.getPhoneNumber());
            researchingProject.setEmail(researchingProjectDto.getEmail());
            researchingProject.setAuthor(researchingProjectDto.getAuthor());
            researchingProject.setWebsite(researchingProjectDto.getWebsite());
            researchingProject.setFax(researchingProjectDto.getFax());
            researchingProject.setIsHighlighted(false);
            researchingProject.setRanking(-1L);
            researchingProject.setProjectImage(researchingProjectDto.getProjectImage());
            researchingProject.setApprover(null);
            researchingProject.setStatus(statusService.getById(Constant.PROJECT_CODE_LN));
            researchingProject.setIsDeleted(false);
            researchingProject.setChallenge(researchingProjectDto.getChallenge());
            researchingProject.setSolution(researchingProjectDto.getSolution());
            researchingProject.setBenefit(researchingProjectDto.getBenefit());
            researchingProject.setProjectType(Constant.PROJECT_TYPE_RESEARCHING);
            List<ProjectField> projectFields = null;
            if (researchingProjectDto.getFieldIdList() != null) {
                projectFields = researchingProjectDto.getFieldIdList().stream().map(fieldId -> {
                    Field field = fieldService.getById(fieldId);
                    ProjectField newProjectField = new ProjectField();
                    newProjectField.setProject(researchingProject);
                    newProjectField.setField(field);
                    return newProjectField;
                }).collect(Collectors.toList());
            }
            researchingProject.setProjectFieldList(projectFields);
            UserProfile userProfile = userProfileService.getById(researchingProjectDto.getUserId());
            if (userProfile == null) {
                LOGGER.info("User not found!");
                return null;
            }
            researchingProject.setUser(userProfile);
            ResearchingProject researchingProjectCreated = researchingProjectRepository.save(researchingProject);
            return researchingProjectCreated;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public ResearchingProject updateDraft(Long researchingProjectId, ResearchingProjectDto researchingProjectDto) {
        try {
            ResearchingProject researchingProject = researchingProjectRepository
                    .findByIdAndIsDeleted(researchingProjectId, false)
                    .orElse(null);
            if (researchingProject == null) {
                LOGGER.info("Researching project not found!");
                return null;
            }
            researchingProject.setName(researchingProjectDto.getName());
            researchingProject.setShortDescription(researchingProjectDto.getShortDescription());
            researchingProject.setAddress(researchingProjectDto.getAddress());
            researchingProject.setTemplate(researchingProjectDto.getTemplate());
            researchingProject.setCompanyName(researchingProjectDto.getCompanyName());
            researchingProject.setPhoneNumber(researchingProjectDto.getPhoneNumber());
            researchingProject.setEmail(researchingProjectDto.getEmail());
            researchingProject.setAuthor(researchingProjectDto.getAuthor());
            researchingProject.setWebsite(researchingProjectDto.getWebsite());
            researchingProject.setFax(researchingProjectDto.getFax());
            researchingProject.setIsHighlighted(false);
            researchingProject.setRanking(-1L);
            researchingProject.setProjectImage(researchingProjectDto.getProjectImage());
            researchingProject.setApprover(null);
            researchingProject.setStatus(statusService.getById(Constant.PROJECT_CODE_LN));
            researchingProject.setIsDeleted(false);
            researchingProject.setChallenge(researchingProjectDto.getChallenge());
            researchingProject.setSolution(researchingProjectDto.getSolution());
            researchingProject.setBenefit(researchingProjectDto.getBenefit());
            researchingProject.setProjectType(Constant.PROJECT_TYPE_RESEARCHING);
            projectFieldService.deleteByProjectId(researchingProject.getId());
            List<ProjectField> projectFields = null;
            if (researchingProjectDto.getFieldIdList() != null) {
                projectFields = researchingProjectDto.getFieldIdList().stream().map(fieldId -> {
                    Field field = fieldService.getById(fieldId);
                    ProjectField newProjectField = new ProjectField();
                    newProjectField.setProject(researchingProject);
                    newProjectField.setField(field);
                    return newProjectField;
                }).collect(Collectors.toList());
            }
            researchingProject.setProjectFieldList(projectFields);
            ResearchingProject researchingProjectDraftUpdated = researchingProjectRepository.save(researchingProject);
            return researchingProjectDraftUpdated;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
