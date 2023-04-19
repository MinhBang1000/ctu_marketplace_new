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
import com.ctu.marketplace.dto.request.RoleDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.dto.response.RoleResponseDto;
import com.ctu.marketplace.entity.Role;
import com.ctu.marketplace.service.RoleService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/role-management")
public class RoleManagementController {
    @Autowired
    private RoleService roleService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<Response<List<RoleResponseDto>>> getAll() {
        List<Role> roles = roleService.getAll();
        List<RoleResponseDto> roleResponseDtos = new ArrayList<>();
        for (Role role : roles) {
            RoleResponseDto roleResponseDto = new RoleResponseDto();
            mapper.map(role, roleResponseDto);
            roleResponseDtos.add(roleResponseDto);
        }
        Response<List<RoleResponseDto>> response = new Response<>(200, roleResponseDtos, Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{roleId}")
    public ResponseEntity<Response<RoleResponseDto>> getById(@PathVariable Long roleId) {
        Role role = roleService.getById(roleId);
        if (role != null) {
            RoleResponseDto roleResponseDto = new RoleResponseDto();
            mapper.map(role, roleResponseDto);
            Response<RoleResponseDto> response = new Response<>(Constant.STATUS_CODE_200, roleResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<RoleResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping
    public ResponseEntity<Response<RoleResponseDto>> create(@RequestBody RoleDto roleDto) {
        Role role = roleService.create(roleDto);
        if (role != null) {
            RoleResponseDto roleResponseDto = new RoleResponseDto();
            mapper.map(role, roleResponseDto);
            Response<RoleResponseDto> response = new Response<>(Constant.STATUS_CODE_200, roleResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<RoleResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{roleId}")
    public ResponseEntity<Response<RoleResponseDto>> update(@PathVariable Long roleId,
            @RequestBody RoleDto roleDto) {
        Role role = roleService.update(roleId, roleDto);
        if (role != null) {
            RoleResponseDto roleResponseDto = new RoleResponseDto();
            mapper.map(role, roleResponseDto);
            Response<RoleResponseDto> response = new Response<>(Constant.STATUS_CODE_200, roleResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<RoleResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{roleId}")
    public ResponseEntity<Response<Boolean>> deleteById(@PathVariable Long roleId) {
        boolean role = roleService.deleteById(roleId);
        if (role) {
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
