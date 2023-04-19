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
import com.ctu.marketplace.controller.common.StatusCommonController;
import com.ctu.marketplace.dto.request.StatusDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.dto.response.StatusResponseDto;
import com.ctu.marketplace.entity.Status;
import com.ctu.marketplace.service.StatusService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/status-management")
public class StatusManagementController extends StatusCommonController {
    @Autowired
    private StatusService statusService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/{statusId}")
    public ResponseEntity<Response<StatusResponseDto>> getById(@PathVariable Long statusId) {
        Status status = statusService.getById(statusId);
        if (status != null) {
            StatusResponseDto statusResponseDto = new StatusResponseDto();
            mapper.map(status, statusResponseDto);
            Response<StatusResponseDto> response = new Response<>(Constant.STATUS_CODE_200, statusResponseDto, Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<StatusResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping
    public ResponseEntity<Response<StatusResponseDto>> create(@RequestBody StatusDto statusDto) {
        Status status = statusService.create(statusDto);
        if (status != null) {
            StatusResponseDto statusResponseDto = new StatusResponseDto();
            mapper.map(status, statusResponseDto);
            Response<StatusResponseDto> response = new Response<>(Constant.STATUS_CODE_200, statusResponseDto, Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<StatusResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{statusId}")
    public ResponseEntity<Response<StatusResponseDto>> update(@PathVariable Long statusId,
            @RequestBody StatusDto statusDto) {
        Status status = statusService.update(statusId, statusDto);
        if (status != null) {
            StatusResponseDto statusResponseDto = new StatusResponseDto();
            mapper.map(status, statusResponseDto);
            Response<StatusResponseDto> response = new Response<>(Constant.STATUS_CODE_200, statusResponseDto, Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<StatusResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{statusId}")
    public ResponseEntity<Response<Boolean>> deleteById(@PathVariable Long statusId) {
        boolean status = statusService.deleteById(statusId);
        if (status) {
            Response<Boolean> response = new Response<>(Constant.STATUS_CODE_200, true, Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<Boolean> response = new Response<>(Constant.STATUS_CODE_400, false,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }
}
