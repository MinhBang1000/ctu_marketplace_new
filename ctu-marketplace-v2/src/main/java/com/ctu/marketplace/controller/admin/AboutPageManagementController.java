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
import com.ctu.marketplace.dto.request.AboutPageDto;
import com.ctu.marketplace.dto.response.AboutPageResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.AboutPage;
import com.ctu.marketplace.service.AboutPageService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/about-page-management")
public class AboutPageManagementController {
    @Autowired
    private AboutPageService aboutPageService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/{footerId}")
    public ResponseEntity<Response<AboutPageResponseDto>> getById(@PathVariable Long footerId) {
        AboutPage aboutPage = aboutPageService.getById(footerId);
        if (aboutPage != null) {
            AboutPageResponseDto aboutPageResponseDto = new AboutPageResponseDto();
            mapper.map(aboutPage, aboutPageResponseDto);
            Response<AboutPageResponseDto> response = new Response<>(Constant.STATUS_CODE_200, aboutPageResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<AboutPageResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }

    }

    @PutMapping("/{footerId}")
    public ResponseEntity<Response<AboutPageResponseDto>> update(@PathVariable Long footerId,
            @RequestBody AboutPageDto aboutPageDto) {
        AboutPage aboutPage = aboutPageService.update(footerId, aboutPageDto);
        AboutPageResponseDto aboutPageResponseDto = new AboutPageResponseDto();
        if (aboutPage != null) {
            mapper.map(aboutPage, aboutPageResponseDto);
            Response<AboutPageResponseDto> response = new Response<>(Constant.STATUS_CODE_200, aboutPageResponseDto,
                    Constant.UPDATE_SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<AboutPageResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.UPDATE_FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }
}
