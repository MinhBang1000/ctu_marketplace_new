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
import com.ctu.marketplace.controller.common.TransmissionMethodCommonController;
import com.ctu.marketplace.dto.request.TransMethodDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.dto.response.TransMethodResponseDto;
import com.ctu.marketplace.entity.TransMethod;
import com.ctu.marketplace.service.TransMethodService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/transmission-method-management")
public class TransmissionMethodManagementController extends TransmissionMethodCommonController {
    @Autowired
    private TransMethodService transMethodService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/{transMethodId}")
    public ResponseEntity<Response<TransMethodResponseDto>> getById(@PathVariable Long transMethodId) {
        TransMethodResponseDto transMethodResponseDto = new TransMethodResponseDto();
        TransMethod transMethod = transMethodService.getById(transMethodId);
        if (transMethod != null) {
            mapper.map(transMethod, transMethodResponseDto);
            Response<TransMethodResponseDto> response = new Response<>(Constant.STATUS_CODE_200,
                    transMethodResponseDto, Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<TransMethodResponseDto> response = new Response<>(Constant.STATUS_CODE_400,
                    null, Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping
    public ResponseEntity<Response<TransMethodResponseDto>> create(
            @RequestBody TransMethodDto transMethodDto) {
        TransMethodResponseDto transMethodResponseDto = new TransMethodResponseDto();
        TransMethod transMethod = transMethodService.create(transMethodDto);
        if (transMethod != null) {
            mapper.map(transMethod, transMethodResponseDto);
            Response<TransMethodResponseDto> response = new Response<>(Constant.STATUS_CODE_200,
                    transMethodResponseDto, Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<TransMethodResponseDto> response = new Response<>(Constant.STATUS_CODE_400,
                    null, Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{transMethodId}")
    public ResponseEntity<Response<Boolean>> delete(@PathVariable Long transMethodId) {
        TransMethod transMethod = transMethodService.getById(transMethodId);
        if (transMethod != null) {
            Response<Boolean> response = new Response<>(Constant.STATUS_CODE_200,
                    true, Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<Boolean> response = new Response<>(Constant.STATUS_CODE_400,
                    false, Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{transMethodId}")
    public ResponseEntity<Response<TransMethodResponseDto>> update(@PathVariable Long transMethodId,
            @RequestBody TransMethodDto transMethodDto) {
        TransMethodResponseDto transMethodResponseDto = new TransMethodResponseDto();
        TransMethod transMethod = transMethodService.update(transMethodId, transMethodDto);
        if (transMethod != null) {
            mapper.map(transMethod, transMethodResponseDto);
            Response<TransMethodResponseDto> response = new Response<>(Constant.STATUS_CODE_200,
                    transMethodResponseDto, Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<TransMethodResponseDto> response = new Response<>(Constant.STATUS_CODE_400,
                    null, Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }
}
