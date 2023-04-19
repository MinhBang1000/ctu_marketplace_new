package com.ctu.marketplace.controller.cpublic;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctu.marketplace.common.BaseURL;
import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.response.FaqResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Faq;
import com.ctu.marketplace.service.FaqService;

@RestController
@RequestMapping(BaseURL.PUBLIC + "/faqs")
public class FaqPublicController {
    @Autowired
    private FaqService faqService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<Response<List<FaqResponseDto>>> getAll() {
        List<FaqResponseDto> faqResponseDtos = new ArrayList<>();
        List<Faq> faqs;
        faqs = faqService.getAll();
        for (Faq faq : faqs) {
            FaqResponseDto faqResponseDto = new FaqResponseDto();
            mapper.map(faq, faqResponseDto);
            faqResponseDtos.add(faqResponseDto);
        }
        Response<List<FaqResponseDto>> response = new Response<>(Constant.STATUS_CODE_200, faqResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }
}
