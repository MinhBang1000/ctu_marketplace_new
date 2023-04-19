package com.ctu.marketplace.controller.admin;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.request.GroupDetailWithAlreadyUserDto;
import com.ctu.marketplace.dto.request.GroupDetailWithNotAlreadyUserDto;
import com.ctu.marketplace.dto.request.ResearchGroupDto;
import com.ctu.marketplace.dto.response.GroupDetailResponseDto;
import com.ctu.marketplace.dto.response.ResearchGroupResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.GroupDetail;
import com.ctu.marketplace.entity.ResearchGroup;
import com.ctu.marketplace.service.GroupDetailService;
import com.ctu.marketplace.service.ResearchGroupService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/research-group-management")
public class ResearchGroupManagementController {
    @Autowired
    private ResearchGroupService researchGroupService;

    @Autowired
    private GroupDetailService groupDetailService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<Response<List<ResearchGroupResponseDto>>> getAll() {
        List<ResearchGroup> researchGroups = researchGroupService.getAll();
        List<ResearchGroupResponseDto> researchGroupResponseDtos = new ArrayList<>();
        for (ResearchGroup researchGroup : researchGroups) {
            ResearchGroupResponseDto researchGroupResponseDto = new ResearchGroupResponseDto();
            mapper.map(researchGroup, researchGroupResponseDto);
            researchGroupResponseDtos.add(researchGroupResponseDto);
        }
        Response<List<ResearchGroupResponseDto>> response = new Response<>(Constant.STATUS_CODE_200,
                researchGroupResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/userId/{userId}")
    public ResponseEntity<Response<List<ResearchGroupResponseDto>>> getAllByUserAdmin(@PathVariable Long userId) {
        List<ResearchGroup> researchGroups = researchGroupService.getAllByUserAdmin(userId);
        List<ResearchGroupResponseDto> researchGroupResponseDtos = new ArrayList<>();
        for (ResearchGroup researchGroup : researchGroups) {
            ResearchGroupResponseDto researchGroupResponseDto = new ResearchGroupResponseDto();
            mapper.map(researchGroup, researchGroupResponseDto);
            researchGroupResponseDtos.add(researchGroupResponseDto);
        }
        Response<List<ResearchGroupResponseDto>> response = new Response<>(Constant.STATUS_CODE_200,
                researchGroupResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{researchGroupId}")
    public ResponseEntity<Response<ResearchGroupResponseDto>> getById(@PathVariable Long researchGroupId) {
        ResearchGroup researchGroup = researchGroupService.getById(researchGroupId);
        if (researchGroup != null) {
            ResearchGroupResponseDto researchGroupResponseDto = new ResearchGroupResponseDto();
            mapper.map(researchGroup, researchGroupResponseDto);
            Response<ResearchGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_200,
                    researchGroupResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<ResearchGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping
    public ResponseEntity<Response<ResearchGroupResponseDto>> create(
            @RequestBody ResearchGroupDto researchGroupDto) {
        ResearchGroup researchGroup = researchGroupService.create(researchGroupDto);
        if (researchGroup != null) {
            ResearchGroupResponseDto researchGroupResponseDto = new ResearchGroupResponseDto();
            mapper.map(researchGroup, researchGroupResponseDto);
            Response<ResearchGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_200,
                    researchGroupResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<ResearchGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

    }

    @PutMapping("/{researchGroupId}")
    public ResponseEntity<Response<ResearchGroupResponseDto>> update(
            @PathVariable Long researchGroupId,
            @RequestBody ResearchGroupDto researchGroupDto) {
        ResearchGroup researchGroup = researchGroupService.update(researchGroupId, researchGroupDto);
        if (researchGroup != null) {
            ResearchGroupResponseDto researchGroupResponseDto = new ResearchGroupResponseDto();
            mapper.map(researchGroup, researchGroupResponseDto);
            Response<ResearchGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_200,
                    researchGroupResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<ResearchGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @DeleteMapping("/{researchGroupId}")
    public ResponseEntity<Response<Boolean>> deleteById(@PathVariable Long researchGroupId) {
        boolean researchGroup = researchGroupService.deleteById(researchGroupId);
        if (researchGroup) {
            ResearchGroupResponseDto researchGroupResponseDto = new ResearchGroupResponseDto();
            mapper.map(researchGroup, researchGroupResponseDto);
            Response<Boolean> response = new Response<>(Constant.STATUS_CODE_200, true,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<Boolean> response = new Response<>(Constant.STATUS_CODE_400, false,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

    }

    @PostMapping("/add-other-member-to-group")
    public ResponseEntity<Response<List<GroupDetailResponseDto>>> addOtherMemberToGroupDetail(
            @RequestBody GroupDetailWithNotAlreadyUserDto groupDetailWithNotAlreadyUserDto) {
        List<GroupDetail> groupDetails = groupDetailService
                .createWithNotAlreadyUser(groupDetailWithNotAlreadyUserDto);
        if (groupDetails.isEmpty()) {
            Response<List<GroupDetailResponseDto>> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        List<GroupDetailResponseDto> groupDetailResponseDtos = new ArrayList<>();
        for (GroupDetail groupDetail : groupDetails) {
            GroupDetailResponseDto groupDetailResponseDto = new GroupDetailResponseDto();
            mapper.map(groupDetail, groupDetailResponseDto);
            groupDetailResponseDtos.add(groupDetailResponseDto);
        }
        Response<List<GroupDetailResponseDto>> response = new Response<>(Constant.STATUS_CODE_200,
                groupDetailResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/add-member-to-group")
    public ResponseEntity<Response<List<GroupDetailResponseDto>>> addMemberToGroupDetail(
            @RequestBody GroupDetailWithAlreadyUserDto groupDetailWithAlreadyUserDto) {
        List<GroupDetail> groupDetails = groupDetailService
                .createWithAlreadyUser(groupDetailWithAlreadyUserDto);
        if (groupDetails.isEmpty()) {
            Response<List<GroupDetailResponseDto>> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        List<GroupDetailResponseDto> groupDetailResponseDtos = new ArrayList<>();
        for (GroupDetail groupDetail : groupDetails) {
            GroupDetailResponseDto groupDetailResponseDto = new GroupDetailResponseDto();
            mapper.map(groupDetail, groupDetailResponseDto);
            groupDetailResponseDtos.add(groupDetailResponseDto);
        }
        Response<List<GroupDetailResponseDto>> response = new Response<>(Constant.STATUS_CODE_200,
                groupDetailResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/group-detail-id/{groupDetailId}")
    public ResponseEntity<Response<GroupDetailResponseDto>> updateGroupDetail(
            @PathVariable Long groupDetailId,
            @RequestBody GroupDetailWithNotAlreadyUserDto groupDetailWithNotAlreadyUserDto) {

        GroupDetail groupDetail = groupDetailService.update(groupDetailId, groupDetailWithNotAlreadyUserDto);
        if (groupDetail != null) {
            GroupDetailResponseDto groupDetailResponseDto = new GroupDetailResponseDto();
            mapper.map(groupDetail, groupDetailResponseDto);
            Response<GroupDetailResponseDto> response = new Response<>(Constant.STATUS_CODE_200, groupDetailResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<GroupDetailResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }

    }

    @DeleteMapping("/delete-group-members/{groupDetailId}")
    public ResponseEntity<Response<Boolean>> deleteGroupMemberById(
            @PathVariable Long groupDetailId) {
        boolean groupDetail = groupDetailService.deleteById(groupDetailId);
        if (groupDetail) {
            Response<Boolean> response = new Response<>(Constant.STATUS_CODE_200, true,
                    Constant.DELETE_SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<Boolean> response = new Response<>(Constant.STATUS_CODE_400, false,
                    Constant.DELETE_FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }
}
