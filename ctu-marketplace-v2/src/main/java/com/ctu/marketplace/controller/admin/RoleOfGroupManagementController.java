package com.ctu.marketplace.controller.admin;

import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.request.RoleOfGroupDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.dto.response.RoleOfGroupResponseDto;
import com.ctu.marketplace.entity.RoleOfGroup;
import com.ctu.marketplace.service.RoleOfGroupService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/role-of-group-management")
public class RoleOfGroupManagementController {
    @Autowired
    private RoleOfGroupService roleOfGroupService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<Response<List<RoleOfGroupResponseDto>>> getAll() {
        List<RoleOfGroup> roleOfGroups = roleOfGroupService.getAll();
        List<RoleOfGroupResponseDto> roleOfGroupResponseDtos = new ArrayList<>();
        for (RoleOfGroup roleOfGroup : roleOfGroups) {
            RoleOfGroupResponseDto roleOfGroupResponseDto = new RoleOfGroupResponseDto();
            mapper.map(roleOfGroup, roleOfGroupResponseDto);
            roleOfGroupResponseDtos.add(roleOfGroupResponseDto);
        }
        Response<List<RoleOfGroupResponseDto>> response = new Response<>(200, roleOfGroupResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response<RoleOfGroupResponseDto>> getById(@PathVariable Long id) {
        RoleOfGroup roleOfGroup = roleOfGroupService.getById(id);
        if (roleOfGroup != null) {
            RoleOfGroupResponseDto roleOfGroupResponseDto = new RoleOfGroupResponseDto();
            mapper.map(roleOfGroup, roleOfGroupResponseDto);
            Response<RoleOfGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_200, roleOfGroupResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<RoleOfGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping
    public ResponseEntity<Response<RoleOfGroupResponseDto>> create(
            @RequestBody RoleOfGroupDto roleOfGroupDto) {
        RoleOfGroup roleOfGroup = roleOfGroupService.create(roleOfGroupDto);
        if (roleOfGroup != null) {
            RoleOfGroupResponseDto roleOfGroupResponseDto = new RoleOfGroupResponseDto();
            mapper.map(roleOfGroup, roleOfGroupResponseDto);
            Response<RoleOfGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_200, roleOfGroupResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<RoleOfGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{roleOfGroupId}")
    public ResponseEntity<Response<RoleOfGroupResponseDto>> update(@PathVariable Long roleOfGroupId,
            @RequestBody RoleOfGroupDto roleOfGroupDto) {
        RoleOfGroup roleOfGroup = roleOfGroupService.update(roleOfGroupId,roleOfGroupDto);
        if (roleOfGroup != null) {
            RoleOfGroupResponseDto roleOfGroupResponseDto = new RoleOfGroupResponseDto();
            mapper.map(roleOfGroup, roleOfGroupResponseDto);
            Response<RoleOfGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_200, roleOfGroupResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<RoleOfGroupResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{roleOfGroupId}")
    public ResponseEntity<Response<Boolean>> deleteById(@PathVariable Long roleOfGroupId) {
        boolean roleOfGroup = roleOfGroupService.deleteById(roleOfGroupId);
        if (roleOfGroup) {
            Response<Boolean> response = new Response<>(Constant.STATUS_CODE_200, true,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<Boolean> response = new Response<>(Constant.STATUS_CODE_400, false,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

}
