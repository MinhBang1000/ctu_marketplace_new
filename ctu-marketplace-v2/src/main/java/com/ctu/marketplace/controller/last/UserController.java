package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.last.request.ImageDTO;
import com.ctu.marketplace.dto.last.request.UserProfileDTO;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.dto.response.UserProfileResponseDto;
import com.ctu.marketplace.service.last.UserService;
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
}
