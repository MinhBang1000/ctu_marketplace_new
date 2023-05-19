package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.last.request.ImageDTO;
import com.ctu.marketplace.dto.last.request.UserProfileDTO;
import com.ctu.marketplace.dto.request.PasswordDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.dto.response.UserProfileResponseDto;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.service.UserProfileService;
import com.ctu.marketplace.service.last.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v3/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private ModelMapper mapper;

    @PutMapping("/update-image")
    public ResponseEntity<Response<String>> updateImage(@RequestParam(value = "imageName", required = true) String imageName) {
        String exceptionMsg = "";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try {
            this.userService.updateAvatar(imageName, authentication.getName());
            return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_200, "Avatar Updated !", Constant.SUCCESS_MESSAGE), HttpStatus.OK);
        }catch (Exception e){
            exceptionMsg = e.getMessage();
        }
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_400, exceptionMsg, Constant.FAILED_MESSAGE), HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update-informations")
    public ResponseEntity<Response<String>> updateInformations(@RequestBody UserProfileDTO userProfileDTO) {
        String exceptionMsg = "";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try {
            this.userService.updateInformations(userProfileDTO, authentication.getName());
            return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_200, "Informations Updated !", Constant.SUCCESS_MESSAGE), HttpStatus.OK);
        }catch (Exception e){
            exceptionMsg = e.getMessage();
        }
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_400, exceptionMsg, Constant.FAILED_MESSAGE), HttpStatus.BAD_REQUEST);
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
