package com.ctu.marketplace.service;

import java.util.List;

import com.ctu.marketplace.dto.request.UserFunctionDto;
import com.ctu.marketplace.entity.UserFunction;

public interface UserFunctionService {
    public List<UserFunction> getAllByUserProfileId(Long userProfileId);
    public UserFunction create(UserFunctionDto userFunctionDto);
    public void setDefaultForUserProfile(Long userProfileId);
    public UserFunction update(UserFunctionDto userFunctionDto);
    public boolean deleteUserFunctionByUserProfileId(Long userProfileId);
    public boolean deleteByUserProfileIdAndFunctionId(Long userProfileId, Long functionId);
}
