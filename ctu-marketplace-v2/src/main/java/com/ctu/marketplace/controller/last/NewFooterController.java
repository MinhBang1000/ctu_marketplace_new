package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.last.request.NewFooterRequestDTO;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.service.last.NewFooterInfoService;
import com.ctu.marketplace.service.last.NewFooterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v3/footers")
@RequiredArgsConstructor
public class NewFooterController {
    private final NewFooterService newFooterService;
    private final NewFooterInfoService newFooterInfoService;

    @PostMapping()
    public ResponseEntity<Response<String>> create(@RequestBody NewFooterRequestDTO newFooterRequestDTO) {
        this.newFooterService.create(newFooterRequestDTO);
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_400,"Create new footer successfully!", Constant.CREATE_SUCCESS_MESSAGE), HttpStatus.CREATED);
    }
}
