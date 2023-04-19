package com.ctu.marketplace.controller.auth;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.request.CreateUserProfileGuestDto;
import com.ctu.marketplace.dto.request.CreateUserProfileResearcherDto;
import com.ctu.marketplace.dto.request.LoginDto;
import com.ctu.marketplace.dto.request.UpdatePasswordDto;
import com.ctu.marketplace.dto.response.LoginResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.dto.response.UserProfileResponseDto;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.service.PasswordResetCodeService;
import com.ctu.marketplace.service.UserProfileService;
import com.ctu.marketplace.utils.TokenProvider;

@RestController
@RequestMapping(BaseURL.AUTH)
public class AuthController {
    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private PasswordResetCodeService passwordResetCodeService;

    @PostMapping("/login")
    public ResponseEntity<Response<LoginResponseDto>> authenticateUser(@Valid @RequestBody LoginDto loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.createToken(authentication);
        Response<LoginResponseDto> response = new Response<LoginResponseDto>(Constant.STATUS_CODE_200,
                new LoginResponseDto(token),
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/sign-up/guest")
    public ResponseEntity<Response<UserProfileResponseDto>> createGuest(
            @RequestBody CreateUserProfileGuestDto createUserProfileGuestDto) {
        UserProfile userProfile = userProfileService.createGuest(createUserProfileGuestDto);
        if (userProfile != null) {
            UserProfileResponseDto userProfileResponseDto = new UserProfileResponseDto();
            mapper.map(userProfile, userProfileResponseDto);
            Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_200,
                    userProfileResponseDto,
                    Constant.CREATE_SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(userResponse);
        } else {
            Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.CREATE_FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(userResponse);
        }
    }

    @PostMapping("/sign-up/researcher")
    public ResponseEntity<Response<UserProfileResponseDto>> createResearcher(
            @RequestBody CreateUserProfileResearcherDto createUserProfileResearcherDto) {
        UserProfile userProfile = userProfileService.createResearcher(createUserProfileResearcherDto);
        if (userProfile != null) {
            UserProfileResponseDto userProfileResponseDto = new UserProfileResponseDto();
            mapper.map(userProfile, userProfileResponseDto);
            Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_200,
                    userProfileResponseDto,
                    Constant.CREATE_SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(userResponse);

        } else {
            Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.CREATE_FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(userResponse);
        }

    }

    @GetMapping
    public ResponseEntity<Response<UserProfileResponseDto>> getUserProfile(
            @RequestParam("username") String username) {
        UserProfile userProfile = userProfileService.getByUsername(username);
        if (userProfile != null) {
            UserProfileResponseDto userProfileResponseDto = new UserProfileResponseDto();
            mapper.map(userProfile, userProfileResponseDto);
            Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_200,
                    userProfileResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(userResponse);
        } else {
            Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(userResponse);
        }
    }

    @PostMapping("/reset-password/{username}")
    public ResponseEntity<Response<Boolean>> sendResetEmail(
            @PathVariable String username) {
        passwordResetCodeService.sendResetCodeEmail(username);
        Response<Boolean> response = new Response<>(Constant.STATUS_CODE_200, true,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/reset-password/check-reset-code/{username}/{code}")
    public ResponseEntity<Response<Boolean>> checkResetCode(
            @PathVariable String username,
            @PathVariable String code) {
        Boolean isValid = passwordResetCodeService.checkResetCode(username, code);
        if (isValid) {
            Response<Boolean> response = new Response<Boolean>(Constant.STATUS_CODE_200, isValid,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<Boolean> response = new Response<Boolean>(Constant.STATUS_CODE_400, isValid,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }

    }

    @PostMapping("/reset-password/update-password")
    public ResponseEntity<Response<Boolean>> upadtePassword(
            @RequestBody UpdatePasswordDto updatePasswordDto) {
        passwordResetCodeService.updatePassword(updatePasswordDto.getUsername(), updatePasswordDto.getPassword(),
                updatePasswordDto.getCode());
        Response<Boolean> userResponse = new Response<>(Constant.STATUS_CODE_200, true,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(userResponse);
    }

}
