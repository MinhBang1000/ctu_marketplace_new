package com.ctu.marketplace.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ctu.marketplace.dto.request.UserFunctionDto;
import com.ctu.marketplace.entity.Function;
import com.ctu.marketplace.entity.UserFunction;
import com.ctu.marketplace.entity.UserFunctionPK;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.repository.UserFunctionRepository;
import com.ctu.marketplace.service.FunctionService;
import com.ctu.marketplace.service.UserFunctionService;
import com.ctu.marketplace.service.UserProfileService;

@Service
@Transactional
public class UserFunctionServiceImpl implements UserFunctionService {
    @Autowired
    private UserFunctionRepository userFunctionRepository;
    @Autowired
    UserProfileService userProfileService;
    @Autowired
    private FunctionService functionService;

    @Override
    public List<UserFunction> getAllByUserProfileId(Long userId) {
        UserProfile userProfile = userProfileService.getById(userId);
        return userFunctionRepository.findAllByUserProfileId(userProfile.getId());
    }

    @Override
    public UserFunction create(UserFunctionDto userFunctionDto) {
        try {
            UserFunction userFunction = new UserFunction();
            UserFunctionPK id = new UserFunctionPK(userFunctionDto.getUserProfileId(), userFunctionDto.getFunctionId());
            userFunction.setId(id);
            userFunction.setFunction(functionService.getById(userFunctionDto.getFunctionId()));
            userFunction.setUserProfile(userProfileService.getById(userFunctionDto.getUserProfileId()));
            userFunction.setIsEnabled(false);
            return userFunctionRepository.save(userFunction);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public void setDefaultForUserProfile(Long userProfileId) {
        try {
            UserProfile userProfile = userProfileService.getById(userProfileId);
            List<Function> functions = functionService.getAllByRoleCode(userProfile.getRole().getCode());
            for (Function function : functions) {
                UserFunctionDto userFunctionDto = new UserFunctionDto(function.getId(), userProfileId, false);
                create(userFunctionDto);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public UserFunction update(UserFunctionDto userFunctionDto) {
        try {
            UserFunction userFunction = userFunctionRepository.findByUserProfileIdAndFunctionId(
                    userFunctionDto.getUserProfileId(),
                    userFunctionDto.getFunctionId()).orElse(null);
            if (userFunction == null)
                return null;
            userFunction.setIsEnabled(userFunctionDto.getIsEnabled());
            return userFunctionRepository.save(userFunction);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteByUserProfileIdAndFunctionId(Long userProfileId, Long functionId) {
        try {
            userFunctionRepository.deleteByUserProfileIdAndFunctionId(userProfileId, functionId);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean deleteUserFunctionByUserProfileId(Long userProfileId) {
        try {
            userFunctionRepository.deleteByUserProfileId(userProfileId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
