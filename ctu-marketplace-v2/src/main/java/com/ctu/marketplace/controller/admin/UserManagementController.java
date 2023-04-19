package com.ctu.marketplace.controller.admin;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.request.CreateUserProfileAdminDto;
import com.ctu.marketplace.dto.request.CreateUserProfileResearcherByAdminDto;
import com.ctu.marketplace.dto.request.UpdateUserProfileAdminDto;
import com.ctu.marketplace.dto.request.UpdateUserProfileResearcherByAdminDto;
import com.ctu.marketplace.dto.request.UserFunctionDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.dto.response.UserFunctionResponseDto;
import com.ctu.marketplace.dto.response.UserProfileResponseDto;
import com.ctu.marketplace.entity.UserFunction;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.service.UserFunctionService;
import com.ctu.marketplace.service.UserProfileService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/user-management")
public class UserManagementController {
	@Autowired
	private UserProfileService userProfileService;
	@Autowired
	private UserFunctionService userFunctionService;
	@Autowired
	private ModelMapper mapper;

	@GetMapping("/users/{userId}")
	public ResponseEntity<Response<List<UserProfileResponseDto>>> getAll(@PathVariable Long userId) {
		List<UserProfile> userProfiles = userProfileService.getAll(userId);
		List<UserProfileResponseDto> userResponses = new ArrayList<>();
		Response<List<UserProfileResponseDto>> response = new Response<>();
		for (UserProfile userProfile : userProfiles) {
			UserProfileResponseDto user = new UserProfileResponseDto();
			mapper.map(userProfile, user);
			userResponses.add(user);
		}
		response.setStatusCode(Constant.STATUS_CODE_200);
		response.setData(userResponses);
		response.setMessage("Thành công!");
		return ResponseEntity.ok().body(response);
	}

	@GetMapping("/users/researcher")
	public ResponseEntity<Response<List<UserProfileResponseDto>>> getAllResearcher() {
		List<UserProfile> userProfiles = userProfileService.getAllResearcher();
		List<UserProfileResponseDto> userResponses = new ArrayList<>();
		Response<List<UserProfileResponseDto>> response = new Response<>();
		for (UserProfile userProfile : userProfiles) {
			UserProfileResponseDto user = new UserProfileResponseDto();
			mapper.map(userProfile, user);
			userResponses.add(user);
		}
		response.setStatusCode(Constant.STATUS_CODE_200);
		response.setData(userResponses);
		response.setMessage("Thành công!");
		return ResponseEntity.ok().body(response);
	}

	@GetMapping("/user-function/{userId}")
	public ResponseEntity<Response<List<UserFunctionResponseDto>>> getAllUserFunctionByUserProfileId(
			@PathVariable Long userId) {
		List<UserFunction> userFunctions = userFunctionService.getAllByUserProfileId(userId);
		List<UserFunctionResponseDto> userFunctionResponseDtos = new ArrayList<>();
		for (UserFunction userFunction : userFunctions) {
			UserFunctionResponseDto userFunctionResponseDto = new UserFunctionResponseDto();
			mapper.map(userFunction, userFunctionResponseDto);
			userFunctionResponseDtos.add(userFunctionResponseDto);
		}
		Response<List<UserFunctionResponseDto>> response = new Response<>(200, userFunctionResponseDtos,
				Constant.SUCCESS_MESSAGE);
		return ResponseEntity.ok().body(response);
	}

	@PostMapping("/researcher")
	public ResponseEntity<Response<UserProfileResponseDto>> createResearcherByAdmin(
			@Valid @RequestBody CreateUserProfileResearcherByAdminDto createUserProfileResearcherByAdminDto) {
		UserProfile userProfile = userProfileService
				.createResearcherByAdmin(createUserProfileResearcherByAdminDto);
		if (userProfile != null) {
			UserProfileResponseDto userProfileResponseDto = new UserProfileResponseDto();
			mapper.map(userProfile, userProfileResponseDto);
			Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_200, userProfileResponseDto,
					Constant.CREATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(userResponse);
		} else {
			Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_400, null, Constant.CREATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(userResponse);
		}

	}

	@PutMapping("/researcher/{userId}")
	public ResponseEntity<Response<UserProfileResponseDto>> updateResearcherByAdmin(
			@PathVariable Long userId,
			@RequestBody UpdateUserProfileResearcherByAdminDto updateUserProfileResearcherByAdminDto) {
		UserProfile userProfile = userProfileService.updateResearcherByAdmin(userId,
				updateUserProfileResearcherByAdminDto);
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

	@PostMapping("/admin")
	public ResponseEntity<Response<UserProfileResponseDto>> createAdmin(
			@RequestBody CreateUserProfileAdminDto createUserProfileAdminDto) {
		UserProfile userProfile = userProfileService.createAdmin(createUserProfileAdminDto);
		if (userProfile != null) {
			UserProfileResponseDto userProfileResponseDto = new UserProfileResponseDto();
			mapper.map(userProfile, userProfileResponseDto);
			Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_200, userProfileResponseDto,
					Constant.CREATE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(userResponse);
		} else {
			Response<UserProfileResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.CREATE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(userResponse);
		}
	}

	@PutMapping("/admin/{userId}")
	public ResponseEntity<Response<UserProfileResponseDto>> updateAdmin(
			@PathVariable Long userId, @RequestBody UpdateUserProfileAdminDto updateUserProfileAdminDto) {
		UserProfile userProfile = userProfileService.updateAdmin(userId, updateUserProfileAdminDto);
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

	@PutMapping("/assign-access-rights-to-user")
	public ResponseEntity<Response<UserFunctionResponseDto>> assignAccessRightsToUser(
			@RequestBody UserFunctionDto userFunctionDto) {
		UserFunction userFunction = userFunctionService.update(userFunctionDto);
		if (userFunction != null) {
			UserFunctionResponseDto userFunctionResponseDto = new UserFunctionResponseDto();
			mapper.map(userFunction, userFunctionResponseDto);
			Response<UserFunctionResponseDto> response = new Response<>(Constant.STATUS_CODE_200, userFunctionResponseDto,
					Constant.ACCESS_RIGHT_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<UserFunctionResponseDto> userResponse = new Response<>(Constant.STATUS_CODE_400, null,
					Constant.FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(userResponse);
		}
	}

	@PutMapping("/enable-user")
	public ResponseEntity<Response<Boolean>> enableUser(
			@RequestParam("userId") Long userId, @RequestParam("isEnabled") Boolean isEnabled) {
		boolean check = userProfileService.enableAccount(userId, isEnabled);
		if (check) {
			Response<Boolean> response = new Response<>(Constant.STATUS_CODE_200, true,
					Constant.DELETE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<Boolean> userResponse = new Response<>(Constant.STATUS_CODE_400, false,
					Constant.DELETE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(userResponse);
		}

	}

	@PutMapping("/lock-user")
	public ResponseEntity<Response<Boolean>> lockUser(
			@RequestParam("userId") Long userId, @RequestParam("isLocked") Boolean isLocked) {
		boolean check = userProfileService.lockAccount(userId, isLocked);
		if (check) {
			Response<Boolean> response = new Response<>(Constant.STATUS_CODE_200, true,
					Constant.DELETE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<Boolean> userResponse = new Response<>(Constant.STATUS_CODE_400, false,
					Constant.DELETE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(userResponse);
		}
	}

	@DeleteMapping("/delete-user")
	public ResponseEntity<Response<Boolean>> deleteUser(
			@RequestParam("username") String username) {
		boolean check = userProfileService.deleteByUsername(username);
		if (check) {
			Response<Boolean> response = new Response<>(Constant.STATUS_CODE_200, true,
					Constant.DELETE_SUCCESS_MESSAGE);
			return ResponseEntity.ok().body(response);
		} else {
			Response<Boolean> userResponse = new Response<>(Constant.STATUS_CODE_400, false,
					Constant.DELETE_FAILED_MESSAGE);
			return ResponseEntity.badRequest().body(userResponse);
		}
	}
}
