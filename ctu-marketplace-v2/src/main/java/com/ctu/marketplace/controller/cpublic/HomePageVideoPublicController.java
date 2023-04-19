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
import com.ctu.marketplace.dto.response.HomePageVideoResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.HomePageVideo;
import com.ctu.marketplace.service.HomePageVideoService;

@RestController
@RequestMapping(BaseURL.PUBLIC + "/home-page-video")
public class HomePageVideoPublicController {
    @Autowired
    private HomePageVideoService homePageVideoService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/{homePageVideoId}")
    public ResponseEntity<Response<HomePageVideoResponseDto>> getById(@PathVariable Long homePageVideoId) {
        HomePageVideoResponseDto homePageVideoResponseDto = new HomePageVideoResponseDto();
        HomePageVideo homePageVideo = homePageVideoService.getById(homePageVideoId);
        if (homePageVideo != null) {
            mapper.map(homePageVideo, homePageVideoResponseDto);
            Response<HomePageVideoResponseDto> response = new Response<>(
                    Constant.STATUS_CODE_200,
                    homePageVideoResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<HomePageVideoResponseDto> response = new Response<>(
                    Constant.STATUS_CODE_400,
                    null, Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }

    }

}
