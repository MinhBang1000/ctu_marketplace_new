package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.last.FieldDTO;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Field;
import com.ctu.marketplace.service.last.FieldService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v3/fields")
public class FieldController {
    @Autowired
    private FieldService fieldService;
    @Autowired
    private ModelMapper mapper;
    @GetMapping("")
    public ResponseEntity<Response<List<FieldDTO>>> listField() {
        List<Field> fields = this.fieldService.getAll();
        List<FieldDTO> dtos = fields.stream().map((item) -> {
            return mapper.map(item, FieldDTO.class);
        }).collect(Collectors.toList());
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_200,dtos, Constant.SUCCESS_MESSAGE), HttpStatus.OK);
    }
}
