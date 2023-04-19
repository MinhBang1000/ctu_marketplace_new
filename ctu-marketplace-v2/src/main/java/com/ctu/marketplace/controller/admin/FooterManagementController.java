package com.ctu.marketplace.controller.admin;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.request.FooterDto;
import com.ctu.marketplace.dto.response.FooterResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Footer;
import com.ctu.marketplace.service.FooterService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/footer-management")
public class FooterManagementController {
    @Autowired
    private FooterService footerService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/{footerId}")
    public ResponseEntity<Response<FooterResponseDto>> getFooterById(@PathVariable Long footerId) {
        FooterResponseDto footerResponseDto = new FooterResponseDto();
        Footer footer = footerService.getById(footerId);
        if (footer != null) {
            mapper.map(footer, footerResponseDto);
            Response<FooterResponseDto> response = new Response<>(Constant.STATUS_CODE_200, footerResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<FooterResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{footerId}")
    public ResponseEntity<Response<FooterResponseDto>> update(@PathVariable Long footerId,
            @RequestBody FooterDto footerDto) {
        FooterResponseDto footerResponseDto = new FooterResponseDto();
        Footer footer = footerService.update(footerId,footerDto);
        if (footer != null) {
            mapper.map(footer, footerResponseDto);
            Response<FooterResponseDto> response = new Response<>(Constant.STATUS_CODE_200, footerResponseDto,
                    Constant.UPDATE_SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<FooterResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.UPDATE_FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }

    }

}
