package com.ctu.marketplace.controller.last;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.last.FieldDTO;
import com.ctu.marketplace.dto.last.request.FieldRequestDTO;
import com.ctu.marketplace.dto.last.response.NewProjectDTO;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Field;
import com.ctu.marketplace.entity.NewField;
import com.ctu.marketplace.entity.NewProject;
import com.ctu.marketplace.entity.UserProfile;
import com.ctu.marketplace.service.last.FieldService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        List<NewField> fields = this.fieldService.getAll();
        List<FieldDTO> dtos = fields.stream().map((item) -> {
            return mapper.map(item, FieldDTO.class);
        }).collect(Collectors.toList());
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_200,dtos, Constant.SUCCESS_MESSAGE), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Response<FieldDTO>> createField(@RequestBody FieldRequestDTO fieldDTO) {
        NewField newField = mapper.map(fieldDTO, NewField.class);
        String exceptionMsg = "";
        try {
            FieldDTO dto = this.mapper.map(this.fieldService.create(newField), FieldDTO.class);
            return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_200, dto, Constant.SUCCESS_MESSAGE), HttpStatus.CREATED);
        }catch (Exception e) {
            exceptionMsg = e.getMessage();
        }
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_400, null, exceptionMsg), HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{fieldId}")
    public ResponseEntity<Response<String>> deleteField(@PathVariable Long fieldId) {
        String exceptionMsg = "";
        try {
            this.fieldService.delete(fieldId);
            return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_204, "Deleted!", Constant.DELETE_SUCCESS_MESSAGE), HttpStatus.NO_CONTENT);
        }catch (Exception e){
            exceptionMsg = e.getMessage();
        }
        return new ResponseEntity<>(new Response<>(Constant.STATUS_CODE_400, exceptionMsg, Constant.DELETE_FAILED_MESSAGE), HttpStatus.BAD_REQUEST);
    }
}
