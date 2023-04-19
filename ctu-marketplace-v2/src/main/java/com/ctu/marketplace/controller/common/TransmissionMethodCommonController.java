package com.ctu.marketplace.controller.common;

import java.util.ArrayList;
import java.util.List;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.dto.response.TransMethodResponseDto;
import com.ctu.marketplace.entity.TransMethod;
import com.ctu.marketplace.service.TransMethodService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

public class TransmissionMethodCommonController {
    @Autowired
    private TransMethodService transMethodService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<Response<List<TransMethodResponseDto>>> getAll() {
        List<TransMethodResponseDto> transMethodResponseDtos = new ArrayList<>();
        for (TransMethod transMethod : transMethodService.getAll()) {
            TransMethodResponseDto transMethodResponseDto = new TransMethodResponseDto();
            mapper.map(transMethod, transMethodResponseDto);
            transMethodResponseDtos.add(transMethodResponseDto);
        }
        Response<List<TransMethodResponseDto>> response = new Response<>(200,
                transMethodResponseDtos, Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }
}
