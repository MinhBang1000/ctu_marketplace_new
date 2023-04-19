package com.ctu.marketplace.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctu.marketplace.dto.request.FunctionDto;
import com.ctu.marketplace.dto.request.UserFunctionDto;
import com.ctu.marketplace.entity.Function;
import com.ctu.marketplace.entity.Role;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.FunctionRepository;
import com.ctu.marketplace.service.FunctionService;
import com.ctu.marketplace.service.RoleService;
import com.ctu.marketplace.service.UserFunctionService;
import com.ctu.marketplace.service.UserProfileService;

@Service
public class FunctionServiceImpl implements FunctionService {
    @Autowired
    private FunctionRepository functionRepository;
    @Autowired
    private RoleService roleService;
    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private UserFunctionService userFunctionService;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<Function> getAll() {
        return functionRepository.findAll();
    }

    @Override
    public List<Function> getAllByRoleCode(String roleCode) {
        return functionRepository.findAllByRoleCode(roleCode);
    }

    @Override
    public Function getById(Long functionId) {
        return functionRepository.findById(functionId).orElse(null);
    }

    @Override
    public Function create(FunctionDto functionDto) {
        try {
            Function findFunction = functionRepository.findById(functionDto.getId()).orElse(null);
            if (findFunction != null)
                return null;
            Function function = new Function();
            mapper.map(functionDto, function);
            Role role = roleService.getById(functionDto.getRoleId());
            function.setRole(role);
            Function functionCreated = functionRepository.save(function);
            List<UserProfile> userProfiles = userProfileService.getAllByRoleId(functionDto.getRoleId());
            if (!userProfiles.isEmpty()) {
                for (UserProfile userProfile : userProfiles) {
                    UserFunctionDto userFunctionDto = new UserFunctionDto(functionCreated.getId(), userProfile.getId(),
                            false);
                    userFunctionService.create(userFunctionDto);
                }
            }
            return functionCreated;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Function update(Long functionId, FunctionDto functionDto) {
        try {
            Role role = roleService.getById(functionDto.getRoleId());
            Function function = functionRepository.findById(functionId).orElse(null);
            if (function == null)
                return null;
            Long oldRole = function.getRole().getId();
            Long newRole = role.getId();
            function.setCode(functionDto.getCode());
            function.setName(functionDto.getName());
            function.setRole(role);
            Function returnValue = functionRepository.save(function);
            if (oldRole != functionDto.getRoleId()) {
                List<UserProfile> userProfilesWithOldRole = userProfileService.getAllByRoleId(oldRole);
                for (UserProfile userProfile : userProfilesWithOldRole) {
                    userFunctionService.deleteByUserProfileIdAndFunctionId(userProfile.getId(),
                            function.getId());
                }
                List<UserProfile> userProfilesWithNewRole = userProfileService.getAllByRoleId(newRole);
                for (UserProfile userProfile : userProfilesWithNewRole) {
                    UserFunctionDto userFunctionDto = new UserFunctionDto(returnValue.getId(), userProfile.getId(),
                            false);
                    userFunctionService.create(userFunctionDto);
                }

            }
            return returnValue;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteById(Long functionId) {
        try {
            functionRepository.deleteById(functionId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Function> getAllByRoleId(Long roleId) {
        return functionRepository.findAllByRoleId(roleId);
    }

}
