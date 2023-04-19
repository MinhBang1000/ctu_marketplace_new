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
import com.ctu.marketplace.dto.response.AboutPageResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.AboutPage;
import com.ctu.marketplace.service.AboutPageService;

@RestController
@RequestMapping(BaseURL.PUBLIC + "/about-page")
public class AboutPagePublicController {
    @Autowired
    private AboutPageService aboutPageService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/{id}")
    public ResponseEntity<Response<AboutPageResponseDto>> getById(@PathVariable Long id) {
        AboutPage aboutPage = aboutPageService.getById(id);
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

}
