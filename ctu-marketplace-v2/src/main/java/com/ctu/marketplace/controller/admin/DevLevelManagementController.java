package com.ctu.marketplace.controller.admin;

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
import com.ctu.marketplace.controller.common.DevLevelCommonController;
import com.ctu.marketplace.dto.request.DevLevelDto;
import com.ctu.marketplace.dto.response.DevLevelResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.DevLevel;
import com.ctu.marketplace.service.DevLevelService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/development-level-management")
public class DevLevelManagementController extends DevLevelCommonController {
    @Autowired
    private DevLevelService devLevelService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/{devLevelId}")
    public ResponseEntity<Response<DevLevelResponseDto>> getById(@PathVariable Long devLevelId) {
        DevLevelResponseDto devLevelResponseDto = new DevLevelResponseDto();
        DevLevel devLevel = devLevelService.getById(devLevelId);
        if (devLevel != null) {
            mapper.map(devLevel, devLevelResponseDto);
            Response<DevLevelResponseDto> response = new Response<>(Constant.STATUS_CODE_200, devLevelResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<DevLevelResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }

    }

    @PostMapping
    public ResponseEntity<Response<DevLevelResponseDto>> create(@RequestBody DevLevelDto devLevelDto) {
        DevLevelResponseDto devLevelResponseDto = new DevLevelResponseDto();
        DevLevel devLevel = devLevelService.create(devLevelDto);
        if (devLevel != null) {
            mapper.map(devLevel, devLevelResponseDto);
            Response<DevLevelResponseDto> response = new Response<>(Constant.STATUS_CODE_200, devLevelResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<DevLevelResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{devLevelId}")
    public ResponseEntity<Response<DevLevelResponseDto>> update(@PathVariable Long devLevelId,
            @RequestBody DevLevelDto devLevelDto) {
        DevLevelResponseDto devLevelResponseDto = new DevLevelResponseDto();
        DevLevel devLevel = devLevelService.update(devLevelId, devLevelDto);
        if (devLevel != null) {
            mapper.map(devLevel, devLevelResponseDto);
            Response<DevLevelResponseDto> response = new Response<>(Constant.STATUS_CODE_200, devLevelResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<DevLevelResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{devLevelId}")
    public ResponseEntity<Response<Boolean>> deleteById(@PathVariable Long devLevelId) {
        boolean devLevel = devLevelService.deleteById(devLevelId);
        if (devLevel) {
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
