package com.ctu.marketplace.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.GroupDetailWithAlreadyUserDto;
import com.ctu.marketplace.dto.request.GroupDetailWithNotAlreadyUserDto;
import com.ctu.marketplace.entity.GroupDetail;
import com.ctu.marketplace.repository.GroupDetailRepository;
import com.ctu.marketplace.service.GroupDetailService;
import com.ctu.marketplace.service.ResearchGroupService;
import com.ctu.marketplace.service.RoleOfGroupService;
import com.ctu.marketplace.service.UserProfileService;

@Service
public class GroupDetailServiceImpl implements GroupDetailService {

    @Autowired
    private GroupDetailRepository groupDetailRepository;
    @Autowired
    private RoleOfGroupService roleOfGroupService;
    @Autowired
    private ResearchGroupService researchGroupService;
    @Autowired
    private UserProfileService userProfileService;

    @Override
    public GroupDetail getById(Long groupDetailId) {
        return groupDetailRepository.findById(groupDetailId).orElse(null);
    }

    @Override
    public List<GroupDetail> getAllByResearchGroupId(Long researchGroupId) {
        return groupDetailRepository.findAllByResearchGroupId(researchGroupId);
    }

    @Override
    public List<GroupDetail> createWithAlreadyUser(
            GroupDetailWithAlreadyUserDto groupDetailWithAlreadyUserDto) {
        try {
            GroupDetail groupDetail = new GroupDetail();
            groupDetail.setResearchGroup(
                    researchGroupService.getById(groupDetailWithAlreadyUserDto.getResearchGroupId()));
            groupDetail.setUserProfile(
                    userProfileService.getByUsername(groupDetailWithAlreadyUserDto.getUsername()));
            groupDetail.setRoleOfGroup(
                    roleOfGroupService.getById(groupDetailWithAlreadyUserDto.getRoleOfGroupId()));
            GroupDetail groupDetailCreated = groupDetailRepository.save(groupDetail);
            return groupDetailRepository.findAllByResearchGroupId(groupDetailCreated.getResearchGroup().getId());
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public List<GroupDetail> createWithNotAlreadyUser(
            GroupDetailWithNotAlreadyUserDto groupDetailWithNotAlreadyUserDto) {
        try {
            GroupDetail groupDetail = new GroupDetail();
            groupDetail.setResearchGroup(
                    researchGroupService.getById(groupDetailWithNotAlreadyUserDto.getResearchGroupId()));
            groupDetail.setRoleOfGroup(
                    roleOfGroupService.getById(groupDetailWithNotAlreadyUserDto.getRoleOfGroupId()));
            groupDetail.setAvatar(groupDetailWithNotAlreadyUserDto.getAvatar());
            groupDetail.setFullName(groupDetailWithNotAlreadyUserDto.getFullName());
            groupDetail.setEmail(groupDetailWithNotAlreadyUserDto.getEmail());
            groupDetail.setQualification(groupDetailWithNotAlreadyUserDto.getQualification());
            groupDetail.setBio(groupDetailWithNotAlreadyUserDto.getBio());
            groupDetail.setWebsite(groupDetailWithNotAlreadyUserDto.getWebsite());
            GroupDetail groupDetailCreated = groupDetailRepository.save(groupDetail);
            return groupDetailRepository.findAllByResearchGroupId(groupDetailCreated.getResearchGroup().getId());
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public boolean deleteById(Long groupDetailId) {
        try {
            groupDetailRepository.deleteById(groupDetailId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public GroupDetail update(Long groupDetailId,
            GroupDetailWithNotAlreadyUserDto groupDetailWithNotAlreadyUserDto) {
        try {
            GroupDetail groupDetail = groupDetailRepository.findById(groupDetailId).orElse(null);
            if (groupDetail == null)
                return null;
            groupDetail.setAvatar(groupDetailWithNotAlreadyUserDto.getAvatar());
            groupDetail.setBio(groupDetailWithNotAlreadyUserDto.getBio());
            groupDetail.setEmail(groupDetailWithNotAlreadyUserDto.getEmail());
            groupDetail.setFullName(groupDetailWithNotAlreadyUserDto.getFullName());
            groupDetail.setQualification(groupDetailWithNotAlreadyUserDto.getQualification());
            groupDetail.setRoleOfGroup(
                    roleOfGroupService.getById(groupDetailWithNotAlreadyUserDto.getRoleOfGroupId()));
            groupDetail.setWebsite(groupDetailWithNotAlreadyUserDto.getWebsite());
            return groupDetailRepository.save(groupDetail);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
