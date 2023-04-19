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
import com.ctu.marketplace.controller.cpublic.FaqPublicController;
import com.ctu.marketplace.dto.request.FaqDto;
import com.ctu.marketplace.dto.response.FaqResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Faq;
import com.ctu.marketplace.service.FaqService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/faq-management")
public class FaqManagementController extends FaqPublicController {
    @Autowired
    private FaqService faqService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/{faqId}")
    public ResponseEntity<Response<FaqResponseDto>> getById(@PathVariable Long faqId) {
        FaqResponseDto faqResponseDto = new FaqResponseDto();
        Faq faq = faqService.getById(faqId);
        if (faq != null) {
            mapper.map(faq, faqResponseDto);
            Response<FaqResponseDto> response = new Response<>(Constant.STATUS_CODE_200, faqResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<FaqResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping
    public ResponseEntity<Response<FaqResponseDto>> create(@RequestBody FaqDto faqDto) {
        FaqResponseDto faqResponseDto = new FaqResponseDto();
        Faq faq = faqService.create(faqDto);
        if (faq != null) {
            mapper.map(faq, faqResponseDto);
            Response<FaqResponseDto> response = new Response<>(Constant.STATUS_CODE_200, faqResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<FaqResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }

    }

    @PutMapping("/{faqId}")
    public ResponseEntity<Response<FaqResponseDto>> update(@PathVariable Long faqId, @RequestBody FaqDto faqDto) {
        FaqResponseDto faqResponseDto = new FaqResponseDto();
        Faq faq = faqService.update(faqId,faqDto);
        if (faq != null) {
            mapper.map(faq, faqResponseDto);
            Response<FaqResponseDto> response = new Response<>(Constant.STATUS_CODE_200, faqResponseDto,
                    Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<FaqResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{faqId}")
    public ResponseEntity<Response<Boolean>> deleteById(@PathVariable Long faqId) {
        boolean check = faqService.deleteById(faqId);
        if (check) {
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
