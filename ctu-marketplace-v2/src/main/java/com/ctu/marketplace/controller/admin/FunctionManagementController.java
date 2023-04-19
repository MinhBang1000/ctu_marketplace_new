package com.ctu.marketplace.controller.admin;

import java.util.ArrayList;
import java.util.List;

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
import com.ctu.marketplace.dto.request.FunctionDto;
import com.ctu.marketplace.dto.response.FunctionResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Function;
import com.ctu.marketplace.service.FunctionService;

@RestController
@RequestMapping(BaseURL.ADMIN + "/function-management")
public class FunctionManagementController {
    @Autowired
    private FunctionService functionService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<Response<List<FunctionResponseDto>>> getAll() {
        List<Function> functions = functionService.getAll();
        List<FunctionResponseDto> functionResponseDtos = new ArrayList<>();
        for (Function function : functions) {
            FunctionResponseDto functionResponseDto = new FunctionResponseDto();
            mapper.map(function, functionResponseDto);
            functionResponseDtos.add(functionResponseDto);
        }
        Response<List<FunctionResponseDto>> response = new Response<>(Constant.STATUS_CODE_200, functionResponseDtos,
                Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{functionId}")
    public ResponseEntity<Response<FunctionResponseDto>> getById(@PathVariable Long functionId) {
        Function function = functionService.getById(functionId);
        if (function != null) {
            FunctionResponseDto functionResponseDto = new FunctionResponseDto();
            mapper.map(function, functionResponseDto);
            Response<FunctionResponseDto> response = new Response<>(Constant.STATUS_CODE_200, functionResponseDto, Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<FunctionResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping
    public ResponseEntity<Response<FunctionResponseDto>> create(@RequestBody FunctionDto functionDto) {
        Function function = functionService.create(functionDto);
        if (function != null) {
            FunctionResponseDto functionResponseDto = new FunctionResponseDto();
            mapper.map(function, functionResponseDto);
            Response<FunctionResponseDto> response = new Response<>(Constant.STATUS_CODE_200, functionResponseDto, Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<FunctionResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{functionId}")
    public ResponseEntity<Response<FunctionResponseDto>> update(@PathVariable Long functionId,
            @RequestBody FunctionDto functionDto) {
        Function function = functionService.update(functionId, functionDto);
        if (function != null) {
            FunctionResponseDto functionResponseDto = new FunctionResponseDto();
            mapper.map(function, functionResponseDto);
            Response<FunctionResponseDto> response = new Response<>(Constant.STATUS_CODE_200, functionResponseDto, Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<FunctionResponseDto> response = new Response<>(Constant.STATUS_CODE_400, null,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{functionId}")
    public ResponseEntity<Response<Boolean>> deleteById(@PathVariable Long functionId) {
        boolean function = functionService.deleteById(functionId);
        if (function) {
            Response<Boolean> response = new Response<>(Constant.STATUS_CODE_200, true, Constant.SUCCESS_MESSAGE);
            return ResponseEntity.ok().body(response);
        } else {
            Response<Boolean> response = new Response<>(Constant.STATUS_CODE_400, false,
                    Constant.FAILED_MESSAGE);
            return ResponseEntity.badRequest().body(response);
        }
    }

}
