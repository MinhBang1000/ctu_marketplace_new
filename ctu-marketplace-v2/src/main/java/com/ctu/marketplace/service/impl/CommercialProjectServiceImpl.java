package com.ctu.marketplace.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.config.GenerateDateTime;
import com.ctu.marketplace.dto.request.CommercialProjectDto;
import com.ctu.marketplace.entity.ComDevLevel;
import com.ctu.marketplace.entity.ComTransMethod;
import com.ctu.marketplace.entity.CommercialProject;
import com.ctu.marketplace.entity.DevLevel;
import com.ctu.marketplace.entity.Field;
import com.ctu.marketplace.entity.ProjectField;
import com.ctu.marketplace.entity.Status;
import com.ctu.marketplace.entity.TransMethod;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.CommercialProjectRepository;
import com.ctu.marketplace.service.ComDevLevelService;
import com.ctu.marketplace.service.ComTransMethodService;
import com.ctu.marketplace.service.CommercialProjectService;
import com.ctu.marketplace.service.DevLevelService;
import com.ctu.marketplace.service.EmailService;
import com.ctu.marketplace.service.FieldService;
import com.ctu.marketplace.service.ProjectFieldService;
import com.ctu.marketplace.service.StatusService;
import com.ctu.marketplace.service.TransMethodService;
import com.ctu.marketplace.service.UserProfileService;

@Service
public class CommercialProjectServiceImpl implements CommercialProjectService {
    private static final Logger LOGGER = LogManager.getLogger(CommercialProjectServiceImpl.class);
    @Autowired
    private CommercialProjectRepository commercialProjectRepository;
    @Autowired
    private ProjectFieldService projectFieldService;
    @Autowired
    private ComDevLevelService comDevLevelService;
    @Autowired
    private ComTransMethodService comTransMethodService;
    @Autowired
    private StatusService statusService;
    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private DevLevelService devLevelService;
    @Autowired
    private FieldService fieldService;
    @Autowired
    private TransMethodService transMethodService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private GenerateDateTime generateDateTime;

    @Override
    public CommercialProject getById(Long id) {
        return commercialProjectRepository.findByIdAndIsDeleted(id, false).orElse(null);
    }

    @Override
    public CommercialProject create(CommercialProjectDto commercialProjectDto) {
        try {
            CommercialProject commercialProject = new CommercialProject();
            commercialProject.setProjectType(Constant.PROJECT_TYPE_COMMERCIAL);
            commercialProject.setName(commercialProjectDto.getName());
            commercialProject.setShortDescription(commercialProjectDto.getShortDescription());
            commercialProject.setAddress(commercialProjectDto.getAddress());
            commercialProject.setTemplate(commercialProjectDto.getTemplate());
            commercialProject.setCompanyName(commercialProjectDto.getCompanyName());
            commercialProject.setPhoneNumber(commercialProjectDto.getPhoneNumber());
            commercialProject.setEmail(commercialProjectDto.getEmail());
            commercialProject.setAuthor(commercialProjectDto.getAuthor());
            commercialProject.setWebsite(commercialProjectDto.getWebsite());
            commercialProject.setFax(commercialProjectDto.getFax());
            commercialProject.setIsHighlighted(false);
            commercialProject.setRanking(-1L);
            commercialProject.setProjectImage(commercialProjectDto.getProjectImage());
            commercialProject.setApprover(null);
            commercialProject.setStatus(statusService.getById(Constant.PROJECT_CODE_CD));
            commercialProject.setIsDeleted(false);
            commercialProject.setProcess(commercialProjectDto.getProcess());
            commercialProject.setAdvantage(commercialProjectDto.getAdvantage());
            commercialProject.setScope(commercialProjectDto.getScope());
            commercialProject.setPrice(commercialProjectDto.getPrice());
            UserProfile userProfile = userProfileService.getById(commercialProjectDto.getUserId());
            if (userProfile == null) {
                LOGGER.info("User not found!");
                return null;
            }
            commercialProject.setUser(userProfile);
            List<ComDevLevel> comDevLevels = commercialProjectDto.getComDevLevelList().stream().map(comDevLevel -> {
                DevLevel devLevel = devLevelService.getById(comDevLevel.getDevelopmentLevelId());
                ComDevLevel newComDevLevel = new ComDevLevel();
                newComDevLevel.setCommercialProject(commercialProject);
                newComDevLevel.setDevLevel(devLevel);
                newComDevLevel.setNote(comDevLevel.getNote());
                return newComDevLevel;
            }).collect(Collectors.toList());
            List<ComTransMethod> comTransMethod = commercialProjectDto.getComTransMethodList().stream()
                    .map(comTranMethod -> {
                        TransMethod transMethod = transMethodService.getById(comTranMethod.getTransMethodId());
                        ComTransMethod newComTransMethod = new ComTransMethod();
                        newComTransMethod.setCommercialProject(commercialProject);
                        newComTransMethod.setTransMethod(transMethod);
                        newComTransMethod.setNote(comTranMethod.getNote());
                        return newComTransMethod;
                    }).collect(Collectors.toList());
            List<ProjectField> projectFields = commercialProjectDto.getFieldIdList().stream().map(fieldId -> {
                Field field = fieldService.getById(fieldId);
                ProjectField newProjectField = new ProjectField();
                newProjectField.setProject(commercialProject);
                newProjectField.setField(field);
                return newProjectField;
            }).collect(Collectors.toList());
            commercialProject.setComDevLevelList(comDevLevels);
            commercialProject.setProjectFieldList(projectFields);
            commercialProject.setComTransMethodList(comTransMethod);
            CommercialProject commercialProjectCreated = commercialProjectRepository.save(commercialProject);
            List<UserProfile> userProfileAdmin = userProfileService
                    .getAllUserAdminByDomainId(userProfile.getDomain().getId());
            if (!userProfileAdmin.isEmpty()
                    && (commercialProjectCreated.getStatus().getId() != Constant.PROJECT_CODE_LN)) {
                for (UserProfile userAdmin : userProfileAdmin) {
                    String content = "<h2>[CTU-MARKETPLACE] Thông báo tạo dự án "
                            + generateDateTime.formatTime(commercialProjectCreated.getCreatedDate())
                            + "</h2><div><p>Xin chào "
                            + userAdmin.getFullName()
                            + ",</p><p>Chúng tôi xin thông báo đến bạn thông tin dự án <span style='color:blue'>"
                            + "\"" + commercialProjectCreated.getName() + "\""
                            + "</span> đã được tạo bởi <span style='color:blue'>" + "\","
                            + commercialProjectCreated.getUser().getFullName() + "\""
                            + "</span> bạn vui lòng xem xét kỷ nội dung trước khi tiến hành phê duyệt hoặc từ chối.</p><p>Trân trọng,<br> System Admin.</p></div>";
                    emailService.sendNotificationMessage(userAdmin.getEmail(),
                            "[CTU-MARKETPLACE] TẠO DỰ ÁN "
                                    + generateDateTime.formatTime(commercialProjectCreated.getCreatedDate()),
                            content,
                            commercialProjectCreated.getUser().getEmail());
                }
            }
            return commercialProjectCreated;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public CommercialProject update(Long commercialProjectId, CommercialProjectDto commercialProjectDto) {
        try {
            CommercialProject commercialProject = commercialProjectRepository
                    .findByIdAndIsDeleted(commercialProjectId, false)
                    .orElse(null);
            if (commercialProject == null) {
                LOGGER.info("Commercial project not found!");
                return null;
            }
            commercialProject.setName(commercialProjectDto.getName());
            commercialProject.setShortDescription(commercialProjectDto.getShortDescription());
            commercialProject.setAddress(commercialProjectDto.getAddress());
            commercialProject.setTemplate(commercialProjectDto.getTemplate());
            commercialProject.setCompanyName(commercialProjectDto.getCompanyName());
            commercialProject.setPhoneNumber(commercialProjectDto.getPhoneNumber());
            commercialProject.setEmail(commercialProjectDto.getEmail());
            commercialProject.setAuthor(commercialProjectDto.getAuthor());
            commercialProject.setWebsite(commercialProjectDto.getWebsite());
            commercialProject.setFax(commercialProjectDto.getFax());
            commercialProject.setIsHighlighted(false);
            commercialProject.setRanking(-1L);
            commercialProject.setProjectImage(commercialProjectDto.getProjectImage());
            commercialProject.setApprover(null);
            commercialProject.setStatus(statusService.getById(Constant.PROJECT_CODE_CD));
            commercialProject.setIsDeleted(false);
            commercialProject.setProcess(commercialProjectDto.getProcess());
            commercialProject.setAdvantage(commercialProjectDto.getAdvantage());
            commercialProject.setScope(commercialProjectDto.getScope());
            commercialProject.setPrice(commercialProjectDto.getPrice());

            projectFieldService.deleteByProjectId(commercialProject.getId());
            comDevLevelService.deleteByCommercialProjectId(commercialProject.getId());
            comTransMethodService.deleteByCommercialProjectId(commercialProject.getId());

            List<ComDevLevel> comDevLevels = commercialProjectDto.getComDevLevelList().stream().map(comDevLevel -> {
                DevLevel devLevel = devLevelService.getById(comDevLevel.getDevelopmentLevelId());
                ComDevLevel newComDevLevel = new ComDevLevel();
                newComDevLevel.setCommercialProject(commercialProject);
                newComDevLevel.setDevLevel(devLevel);
                newComDevLevel.setNote(comDevLevel.getNote());
                return newComDevLevel;
            }).collect(Collectors.toList());
            List<ComTransMethod> comTransMethod = commercialProjectDto.getComTransMethodList().stream()
                    .map(comTranMethod -> {
                        TransMethod transMethod = transMethodService.getById(comTranMethod.getTransMethodId());
                        ComTransMethod newComTransMethod = new ComTransMethod();
                        newComTransMethod.setCommercialProject(commercialProject);
                        newComTransMethod.setTransMethod(transMethod);
                        newComTransMethod.setNote(comTranMethod.getNote());
                        return newComTransMethod;
                    }).collect(Collectors.toList());
            List<ProjectField> projectFields = commercialProjectDto.getFieldIdList().stream().map(fieldId -> {
                Field field = fieldService.getById(fieldId);
                ProjectField newProjectField = new ProjectField();
                newProjectField.setProject(commercialProject);
                newProjectField.setField(field);
                return newProjectField;
            }).collect(Collectors.toList());

            commercialProject.setComDevLevelList(comDevLevels);
            commercialProject.setProjectFieldList(projectFields);
            commercialProject.setComTransMethodList(comTransMethod);

            CommercialProject commercialProjectUpdated = commercialProjectRepository.save(commercialProject);
            List<UserProfile> userProfileAdmin = userProfileService
                    .getAllUserAdminByDomainId(commercialProjectUpdated.getUser().getDomain().getId());
            if (!userProfileAdmin.isEmpty()
                    && (commercialProjectUpdated.getStatus().getId() != Constant.PROJECT_CODE_LN)) {
                for (UserProfile userAdmin : userProfileAdmin) {
                    String content = "<h2>[CTU-MARKETPLACE] Thông báo cập nhật dự án "
                            + generateDateTime.formatTime(commercialProjectUpdated.getUpdatedDate())
                            + "</h2><div><p>Xin chào "
                            + userAdmin.getFullName()
                            + ",</p><p>Chúng tôi xin thông báo đến bạn thông tin dự án <span style='color:blue'>"
                            + "\"" + commercialProjectUpdated.getName() + "\""
                            + "</span> đã được cập nhật bởi <span style='color:blue'>" + "\","
                            + commercialProjectUpdated.getUser().getFullName() + "\""
                            + "</span> bạn vui lòng xem xét kỷ nội dung trước khi tiến hành phê duyệt hoặc từ chối.</p><p>Trân trọng,<br> System Admin.</p></div>";
                    emailService.sendNotificationMessage(userAdmin.getEmail(),
                            "[CTU-MARKETPLACE] CẬP NHẬT DỰ ÁN "
                                    + generateDateTime.formatTime(commercialProjectUpdated.getUpdatedDate()),
                            content,
                            commercialProjectUpdated.getUser().getEmail());
                }
            }
            return commercialProject;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public CommercialProject createDraft(CommercialProjectDto commercialProjectDto) {
        try {
            CommercialProject commercialProject = new CommercialProject();
            mapper.map(commercialProjectDto, commercialProject);
            commercialProject.setProjectType(Constant.PROJECT_TYPE_COMMERCIAL);
            commercialProject.setIsHighlighted(false);
            commercialProject.setRanking(-1L);
            commercialProject.setApprover(null);
            commercialProject.setStatus(statusService.getById(Constant.PROJECT_CODE_LN));
            commercialProject.setIsDeleted(false);
            UserProfile userProfile = userProfileService.getById(commercialProjectDto.getUserId());
            if (userProfile == null) {
                LOGGER.info("User not found!");
                return null;
            }
            commercialProject.setUser(userProfile);
            List<ComDevLevel> comDevLevels = null;
            List<ComTransMethod> comTransMethod = null;
            List<ProjectField> projectFields = null;
            if (commercialProjectDto.getComDevLevelList() != null) {
                comDevLevels = commercialProjectDto.getComDevLevelList().stream().map(comDevLevel -> {
                    DevLevel devLevel = devLevelService.getById(comDevLevel.getDevelopmentLevelId());
                    ComDevLevel newComDevLevel = new ComDevLevel();
                    newComDevLevel.setCommercialProject(commercialProject);
                    newComDevLevel.setDevLevel(devLevel);
                    newComDevLevel.setNote(comDevLevel.getNote());
                    return newComDevLevel;
                }).collect(Collectors.toList());
            }
            if (commercialProjectDto.getComTransMethodList() != null) {
                comTransMethod = commercialProjectDto.getComTransMethodList().stream()
                        .map(comTranMethod -> {
                            TransMethod transMethod = transMethodService.getById(comTranMethod.getTransMethodId());
                            ComTransMethod newComTransMethod = new ComTransMethod();
                            newComTransMethod.setCommercialProject(commercialProject);
                            newComTransMethod.setTransMethod(transMethod);
                            newComTransMethod.setNote(comTranMethod.getNote());
                            return newComTransMethod;
                        }).collect(Collectors.toList());
            }
            if (commercialProjectDto.getFieldIdList() != null) {
                projectFields = commercialProjectDto.getFieldIdList().stream().map(fieldId -> {
                    Field field = fieldService.getById(fieldId);
                    ProjectField newProjectField = new ProjectField();
                    newProjectField.setProject(commercialProject);
                    newProjectField.setField(field);
                    return newProjectField;
                }).collect(Collectors.toList());
            }
            commercialProject.setComDevLevelList(comDevLevels);
            commercialProject.setProjectFieldList(projectFields);
            commercialProject.setComTransMethodList(comTransMethod);
            CommercialProject commercialProjectDraftCreated = commercialProjectRepository.save(commercialProject);
            return commercialProjectDraftCreated;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public CommercialProject updateDraft(Long commercialProjectId, CommercialProjectDto commercialProjectDto) {
        try {
            CommercialProject commercialProject = commercialProjectRepository
                    .findByIdAndIsDeleted(commercialProjectId, false)
                    .orElse(null);
            if (commercialProject == null) {
                LOGGER.info("Commercial project not found!");
                return null;
            }
            commercialProject.setName(commercialProjectDto.getName());
            commercialProject.setShortDescription(commercialProjectDto.getShortDescription());
            commercialProject.setAddress(commercialProjectDto.getAddress());
            commercialProject.setTemplate(commercialProjectDto.getTemplate());
            commercialProject.setCompanyName(commercialProjectDto.getCompanyName());
            commercialProject.setPhoneNumber(commercialProjectDto.getPhoneNumber());
            commercialProject.setEmail(commercialProjectDto.getEmail());
            commercialProject.setAuthor(commercialProjectDto.getAuthor());
            commercialProject.setWebsite(commercialProjectDto.getWebsite());
            commercialProject.setFax(commercialProjectDto.getFax());
            commercialProject.setIsHighlighted(false);
            commercialProject.setRanking(-1L);
            commercialProject.setProjectImage(commercialProjectDto.getProjectImage());
            commercialProject.setApprover(null);
            commercialProject.setStatus(statusService.getById(Constant.PROJECT_CODE_LN));
            commercialProject.setIsDeleted(false);
            commercialProject.setProcess(commercialProjectDto.getProcess());
            commercialProject.setAdvantage(commercialProjectDto.getAdvantage());
            commercialProject.setScope(commercialProjectDto.getScope());
            commercialProject.setPrice(commercialProjectDto.getPrice());

            projectFieldService.deleteByProjectId(commercialProjectId);
            comDevLevelService.deleteByCommercialProjectId(commercialProjectId);
            comTransMethodService.deleteByCommercialProjectId(commercialProjectId);

            List<ComDevLevel> comDevLevels = null;
            List<ComTransMethod> comTransMethod = null;
            List<ProjectField> projectFields = null;
            if (commercialProjectDto.getComDevLevelList() != null) {
                comDevLevels = commercialProjectDto.getComDevLevelList().stream().map(comDevLevel -> {
                    DevLevel devLevel = devLevelService.getById(comDevLevel.getDevelopmentLevelId());
                    ComDevLevel newComDevLevel = new ComDevLevel();
                    newComDevLevel.setCommercialProject(commercialProject);
                    newComDevLevel.setDevLevel(devLevel);
                    newComDevLevel.setNote(comDevLevel.getNote());
                    return newComDevLevel;
                }).collect(Collectors.toList());
            }
            if (commercialProjectDto.getComTransMethodList() != null) {
                comTransMethod = commercialProjectDto.getComTransMethodList().stream()
                        .map(comTranMethod -> {
                            TransMethod transMethod = transMethodService.getById(comTranMethod.getTransMethodId());
                            ComTransMethod newComTransMethod = new ComTransMethod();
                            newComTransMethod.setCommercialProject(commercialProject);
                            newComTransMethod.setTransMethod(transMethod);
                            newComTransMethod.setNote(comTranMethod.getNote());
                            return newComTransMethod;
                        }).collect(Collectors.toList());
            }
            if (commercialProjectDto.getFieldIdList() != null) {
                projectFields = commercialProjectDto.getFieldIdList().stream().map(fieldId -> {
                    Field field = fieldService.getById(fieldId);
                    ProjectField newProjectField = new ProjectField();
                    newProjectField.setProject(commercialProject);
                    newProjectField.setField(field);
                    return newProjectField;
                }).collect(Collectors.toList());
            }

            commercialProject.setComDevLevelList(comDevLevels);
            commercialProject.setProjectFieldList(projectFields);
            commercialProject.setComTransMethodList(comTransMethod);

            CommercialProject commercialProjectDraftUpdated = commercialProjectRepository.save(commercialProject);
            return commercialProjectDraftUpdated;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<CommercialProject> getAllByStatusDD() {
        Status sts = statusService.getById(Constant.PROJECT_CODE_DD);
        return commercialProjectRepository.findByStatusAndIsDeleted(sts,
                false);
    }
}
