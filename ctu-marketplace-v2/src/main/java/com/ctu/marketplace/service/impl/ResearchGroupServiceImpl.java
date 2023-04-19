package com.ctu.marketplace.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.request.ResearchGroupDto;
import com.ctu.marketplace.entity.ResearchGroup;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.ResearchGroupRepository;
import com.ctu.marketplace.service.ResearchGroupService;
import com.ctu.marketplace.service.UserProfileService;

@Service
public class ResearchGroupServiceImpl implements ResearchGroupService {
    @Autowired
    private ResearchGroupRepository researchGroupRepository;
    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<ResearchGroup> getAll() {
        return researchGroupRepository.findAllByIsDeleted(false);
    }

    @Override
    public ResearchGroup getById(Long researchGroupId) {
        return researchGroupRepository.findByIdAndIsDeleted(researchGroupId, false).orElse(null);
    }

    @Override
    public ResearchGroup create(ResearchGroupDto researchGroupDto) {
        try {
            ResearchGroup researchGroup = new ResearchGroup();
            mapper.map(researchGroupDto, researchGroup);
            UserProfile userProfile = userProfileService.getById(researchGroupDto.getUserId());
            researchGroup.setUserProfile(userProfile);
            researchGroup.setIsDeleted(false);
            return researchGroupRepository.save(researchGroup);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public ResearchGroup update(Long reseachGroupId, ResearchGroupDto researchGroupDto) {
        try {
            ResearchGroup researchGroup = researchGroupRepository.findByIdAndIsDeleted(reseachGroupId, false).orElse(null);
            if (researchGroup == null)
                return null;
            researchGroup.setGroupName(researchGroupDto.getGroupName());
            researchGroup.setResearchTopic(researchGroupDto.getResearchTopic());
            researchGroup.setShortDescription(researchGroupDto.getShortDescription());
            researchGroup.setGroupImage(researchGroupDto.getGroupImage());
            researchGroup.setPublication(researchGroupDto.getPublication());
            researchGroup.setIntroduction(researchGroupDto.getIntroduction());
            return researchGroupRepository.save(researchGroup);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteById(Long reseachGroupId) {
        try {
            ResearchGroup researchGroup = researchGroupRepository.findByIdAndIsDeleted(reseachGroupId, false).orElse(null);
            if (researchGroup == null)
                return false;
            researchGroup.setIsDeleted(true);
            researchGroupRepository.save(researchGroup);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<ResearchGroup> getAllByUserAdmin(Long userId) {
        UserProfile userProfile;
        userProfile = userProfileService.getById(userId);
        List<ResearchGroup> researchGroups = new ArrayList<>();
        if (userProfile.getRole().getId() == Constant.ROLE_SUPER_ADMIN_ID) {
            researchGroups = researchGroupRepository.findAllResearchGroup();
        }
        if (userProfile.getRole().getId() == Constant.ROLE_ADMIN_ID) {
            researchGroups = researchGroupRepository.findAllResearchGroupByDomain(userProfile.getDomain().getId());
        }
        return researchGroups;
    }
}
