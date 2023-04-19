package com.ctu.marketplace.controller.common;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.response.DomainResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Domain;
import com.ctu.marketplace.service.DomainService;

public class DomainCommonController {
    @Autowired
    private DomainService domainService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<Response<List<DomainResponseDto>>> getAll() {
        List<Domain> domains = domainService.getAll();
        List<DomainResponseDto> domainResponseDtos = new ArrayList<>();
        for (Domain domain : domains) {
            DomainResponseDto domainResponseDto = new DomainResponseDto();
            mapper.map(domain, domainResponseDto);
            domainResponseDtos.add(domainResponseDto);
        }
        Response<List<DomainResponseDto>> response = new Response<>(Constant.STATUS_CODE_200,
                domainResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }
}