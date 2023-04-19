package com.ctu.marketplace.controller.researcher;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.request.PasswordDto;
import com.ctu.marketplace.dto.request.UpdateUserProfileResearcherDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.dto.response.UserProfileResponseDto;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.service.UserProfileService;

@RestController
@RequestMapping(BaseURL.RESEARCHER + "/users")
public class UserResearcherController {
    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private ModelMapper mapper;

    @PutMapping("/{userId}")
    public ResponseEntity<Response<UserProfileResponseDto>> update(
            @PathVariable("userId") Long userId,
            @RequestBody UpdateUserProfileResearcherDto updateUserProfileResearcherDto) {
        UserProfile userProfile = userProfileService.updateResearcher(userId, updateUserProfileResearcherDto);
        if (userProfile != null) {
            UserProfileResponseDto userProfileResponseDto = new UserProfileResponseDto();
            mapper.map(userProfile, userProfileResponseDto);
            Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_200, userProfileResponseDto,
                    Constant.UPDATE_SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(userResponse);
        } else {
            Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.UPDATE_FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(userResponse);
        }
    }

    @PutMapping("/update-password/{userId}")
    public ResponseEntity<Response<UserProfileResponseDto>> updatePassword(
            @PathVariable("userId") Long userId, @RequestBody PasswordDto passwordDto) {
        UserProfile userProfile = userProfileService.updatePassword(userId, passwordDto);
        if (userProfile != null) {
            UserProfileResponseDto userProfileResponseDto = new UserProfileResponseDto();
            mapper.map(userProfile, userProfileResponseDto);
            Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_200, userProfileResponseDto,
                    Constant.UPDATE_SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(userResponse);
        } else {
            Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.UPDATE_FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(userResponse);
        }
    }
}
