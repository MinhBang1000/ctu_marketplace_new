package com.ctu.marketplace.controller.common;

import java.util.ArrayList;
import java.util.List;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.response.DevLevelResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.DevLevel;
import com.ctu.marketplace.service.DevLevelService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

public class DevLevelCommonController {
    @Autowired
    private DevLevelService devLevelService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<Response<List<DevLevelResponseDto>>> getAll() {
        List<DevLevelResponseDto> devLevelResponseDtos = new ArrayList<>();
        List<DevLevel> devLevels = devLevelService.getAll();
        for (DevLevel devLevel : devLevels) {
            DevLevelResponseDto devLevelResponseDto = new DevLevelResponseDto();
            mapper.map(devLevel, devLevelResponseDto);
            devLevelResponseDtos.add(devLevelResponseDto);
        }
        Response<List<DevLevelResponseDto>> response = new Response<List<DevLevelResponseDto>>(Constant.STATUS_CODE_200,
                devLevelResponseDtos, Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

}
