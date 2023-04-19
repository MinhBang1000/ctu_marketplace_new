package com.ctu.marketplace.controller.cpublic;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.response.FooterResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Footer;
import com.ctu.marketplace.service.FooterService;

@RestController
@RequestMapping(BaseURL.PUBLIC + "/footer")
public class FooterPublicController {
    @Autowired
    private FooterService footerService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/{footerId}")
    public ResponseEntity<Response<FooterResponseDto>> getById(@PathVariable Long footerId) {
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
}
