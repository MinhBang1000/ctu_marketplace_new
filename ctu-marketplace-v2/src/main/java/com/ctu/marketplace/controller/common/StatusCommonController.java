package com.ctu.marketplace.controller.common;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.dto.response.StatusResponseDto;
import com.ctu.marketplace.entity.Status;
import com.ctu.marketplace.service.StatusService;

public class StatusCommonController {
    @Autowired
    private StatusService statusService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<Response<List<StatusResponseDto>>> getAll() {
        List<Status> statuses;
        statuses = statusService.getAll();
        List<StatusResponseDto> statusResponseDtos = new ArrayList<>();
        for (Status status : statuses) {
            StatusResponseDto statusResponseDto = new StatusResponseDto();
            mapper.map(status, statusResponseDto);
            statusResponseDtos.add(statusResponseDto);
        }
        Response<List<StatusResponseDto>> response = new Response<>(200, statusResponseDtos, Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }
}
