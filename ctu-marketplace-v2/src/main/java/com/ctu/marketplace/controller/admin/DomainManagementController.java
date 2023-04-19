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
import com.ctu.marketplace.controller.common.DomainCommonController;
import com.ctu.marketplace.dto.request.DomainDto;
import com.ctu.marketplace.dto.response.DomainResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Domain;
import com.ctu.marketplace.service.DomainService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/domain-management")
public class DomainManagementController extends DomainCommonController {
    @Autowired
    private DomainService domainService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/{domainId}")
    public ResponseEntity<Response<DomainResponseDto>> getById(@PathVariable Long domainId) {
        Domain domain = domainService.getById(domainId);
        if (domain != null) {
            DomainResponseDto domainResponseDto = new DomainResponseDto();
            mapper.map(domain, domainResponseDto);
            Response<DomainResponseDto> response = new Response<>(Constant.STATUS_CODE_200, domainResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<DomainResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping
    public ResponseEntity<Response<DomainResponseDto>> create(@RequestBody DomainDto domainDto) {
        Domain domain = domainService.create(domainDto);
        if (domain != null) {
            DomainResponseDto domainResponseDto = new DomainResponseDto();
            mapper.map(domain, domainResponseDto);
            Response<DomainResponseDto> response = new Response<>(Constant.STATUS_CODE_200, domainResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<DomainResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{domainId}")
    public ResponseEntity<Response<DomainResponseDto>> update(@PathVariable Long domainId,
            @RequestBody DomainDto domainDto) {
        Domain domain = domainService.update(domainId,domainDto);
        if (domain != null) {
            DomainResponseDto domainResponseDto = new DomainResponseDto();
            mapper.map(domain, domainResponseDto);
            Response<DomainResponseDto> response = new Response<>(Constant.STATUS_CODE_200, domainResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<DomainResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{domainId}")
    public ResponseEntity<Response<Boolean>> deleteById(@PathVariable Long domainId) {
        boolean domain = domainService.deleteById(domainId);
        if (domain) {
            DomainResponseDto domainResponseDto = new DomainResponseDto();
            mapper.map(domain, domainResponseDto);
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
