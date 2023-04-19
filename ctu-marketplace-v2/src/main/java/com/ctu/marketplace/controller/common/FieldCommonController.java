package com.ctu.marketplace.controller.common;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.ctu.marketplace.common.Constant;
import com.ctu.marketplace.dto.response.FieldResponseDto;
import com.ctu.marketplace.dto.response.Response;
import com.ctu.marketplace.entity.Field;
import com.ctu.marketplace.service.FieldService;

public class FieldCommonController {
	@Autowired
	private FieldService fieldService;
	@Autowired
	private ModelMapper mapper;

	@GetMapping
	public ResponseEntity<Response<List<FieldResponseDto>>> getAll() {
		List<Field> fields = fieldService.getAll();
		List<FieldResponseDto> fieldResponseDtos = new ArrayList<>();
		for (Field field : fields) {
			FieldResponseDto fieldResponseDto = new FieldResponseDto();
			mapper.map(field, fieldResponseDto);
			fieldResponseDtos.add(fieldResponseDto);
		}
		Response<List<FieldResponseDto>> response = new Response<>(200, fieldResponseDtos,
				Constant.SUCCESS_MESSAGE);
		return ResponseEntity.ok().body(response);
	}
}
